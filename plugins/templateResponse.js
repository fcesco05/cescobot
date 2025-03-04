// @type {import('@whiskeysockets/baileys')}

const { proto, generateWAMessage, areJidsSameUser } = (await import('@whiskeysockets/baileys')).default;

export async function all(m, chatUpdate) {
  // Se il messaggio proviene da Baileys stesso, termina immediatamente.
  if (m.isBaileys) {
    return;
  }
  
  // Se non c'è nessun messaggio, termina immediatamente.
  if (!m.message) {
    return;
  }
  
  // Se il messaggio non contiene un tipo di risposta (button, template, list, ecc.), termina immediatamente.
  if (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage)) {
    return;
  }
  
  let id;
  
  // Estrai l'ID selezionato in base al tipo di risposta del messaggio.
  if (m.message.buttonsResponseMessage) {
    id = m.message.buttonsResponseMessage.selectedButtonId;
  } else if (m.message.templateButtonReplyMessage) {
    id = m.message.templateButtonReplyMessage.selectedId;
  } else if (m.message.listResponseMessage) {
    id = m.message.listResponseMessage.singleSelectReply?.selectedRowId;
  } else if (m.message.interactiveResponseMessage) {
    id = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id;
  }
  
  // Ottieni il testo del messaggio di risposta (button o altro).
  const text = m.message.buttonsResponseMessage?.selectedDisplayText || m.message.templateButtonReplyMessage?.selectedDisplayText || m.message.listResponseMessage?.title;
  
  let isIdMessage = false;
  let usedPrefix;

  // Scorri tutti i plugin e verifica se la risposta corrisponde a uno dei comandi dei plugin.
  for (const name in global.plugins) {
    const plugin = global.plugins[name];
    
    if (!plugin || plugin.disabled) {
      continue;
    }
    
    if (!opts['restrict']) {
      if (plugin.tags && plugin.tags.includes('admin')) {
        continue;
      }
    }

    // Salta i plugin che non sono funzioni o che non hanno la proprietà `command`.
    if (typeof plugin !== 'function' || !plugin.command) {
      continue;
    }

    // Funzione per eseguire l'escape dei caratteri speciali nelle espressioni regolari.
    const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    const _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : global.prefix;
    
    // Crea una regex per confrontare il prefisso.
    const match = (_prefix instanceof RegExp ? [[_prefix.exec(id), _prefix]] : Array.isArray(_prefix) ? _prefix.map((p) => {
      const re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
      return [re.exec(id), re];
    }) : typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(id), new RegExp(str2Regex(_prefix))]] : [[[], new RegExp]]
    ).find((p) => p[1]);

    // Se viene trovata una corrispondenza, estrai il prefisso.
    if ((usedPrefix = (match[0] || '')[0])) {
      const noPrefix = id.replace(usedPrefix, '');
      let [command] = noPrefix.trim().split` `.filter((v) => v);
      command = (command || '').toLowerCase();

      // Verifica se il comando corrisponde a quello del plugin.
      const isId = plugin.command instanceof RegExp ?
        plugin.command.test(command) :
        Array.isArray(plugin.command) ?
          plugin.command.some((cmd) => cmd instanceof RegExp ? cmd.test(command) : cmd === command) :
          typeof plugin.command === 'string' ?
            plugin.command === command :
            false;

      if (!isId) {
        continue;
      }

      isIdMessage = true;
    }
  }

  // Genera un nuovo messaggio WhatsApp con il testo appropriato.
  const messages = await generateWAMessage(m.chat, { text: isIdMessage ? id : text, mentions: m.mentionedJid }, {
    userJid: this.user.id,
    quoted: m.quoted && m.quoted.fakeObj,
  });
  
  // Imposta le proprietà della chiave del messaggio.
  messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
  messages.key.id = m.key.id;
  messages.pushName = m.name;
  
  // Se è un messaggio di gruppo, imposta la chiave del partecipante.
  if (m.isGroup) {
    messages.key.participant = messages.participant = m.sender;
  }

  // Crea l'oggetto di aggiornamento del messaggio e emetti l'evento.
  const msg = {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)].map((v) => (v.conn = this, v)),
    type: 'append',
  };

  this.ev.emit('messages.upsert', msg);
}

