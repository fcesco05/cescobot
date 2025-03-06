let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Verifica se il comando viene usato in un gruppo
  if (!m.isGroup) return m.reply('Questo comando può essere utilizzato solo nei gruppi!');
  
  // Verifica se il mittente è un admin
  if (!m.isAdmin) return m.reply('Non sei amministratore o non hai i permessi per utilizzare questo comando!');
  
  // Verifica se il bot è admin
  if (!conn.user.admin) return m.reply('Non ho i permessi necessari per eseguire questo comando (non sono admin)!');

  // Recupera il nome del bot dalle impostazioni o usa un valore di default
  let nomeDelBot = global.db.data.settings[conn.user.jid]?.nomedelbot || 'cescobot';

  // Mappa gli argomenti per aggiornare le impostazioni del gruppo
  let mapping = {
    'blocca': 'announcement', // Solo gli admin possono scrivere
    'sblocca': 'chat'          // Tutti possono scrivere
  };

  let setting = mapping[args[0]?.toLowerCase()];
  if (!setting) {
    return m.reply('Devi specificare "blocca" o "sblocca" per usare questo comando!');
  }

  // Aggiorna l'impostazione del gruppo
  await conn.groupSettingUpdate(m.chat, setting);

  // Prepara il messaggio di risposta in base all'impostazione scelta
  let responseText = setting === 'announcement'
    ? '🚫 I messaggi sono stati bloccati nel gruppo! Solo gli admin possono scrivere ora.'
    : '✅ I messaggi sono stati sbloccati! Tutti possono scrivere di nuovo.';

  // Invia il messaggio con le informazioni di newsletter forwarding
  await conn.sendMessage(m.chat, {
    text: responseText,
    contextInfo: {
      forwardingScore: 99,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  }, { quoted: m });
};

handler.help = ['proteggi'];
handler.tags = ['admin'];
handler.command = /^(proteggi)$/i;
handler.admin = true;
handler.botAdmin = true;

export default handler;
