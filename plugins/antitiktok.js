let linkRegex = /vm.tiktok.com/i;

export async function before(message, { isAdmin, groupMetadata, isBotAdmin }) {
  // Se il messaggio è inviato da Baileys (bot), non elaborarlo
  if (message.isBaileys && message.fromMe) return false;

  // Se il messaggio non contiene testo, non elaborarlo
  if (!message.text) return false;

  // Recupera le impostazioni del gruppo dalla base dati
  let groupSettings = global.db.data.chats[message.chat];
  let warningThreshold = '5';
  let participant = message.participant.id;
  let messageId = message.id;
  let userSettings = global.db.data.users[message.sender] || {};

  // Verifica se il messaggio contiene un link TikTok
  const isTikTokLink = linkRegex.test(message.text);
  const antiTikTokKeyword = "Anti - TikTok";

  // Se l'amministratore ha abilitato il controllo per TikTok e il messaggio contiene il termine "Anti - TikTok", non fare nulla
  if (isAdmin && groupSettings.antitiktok && message.text.includes(antiTikTokKeyword)) return;

  // Se il controllo è abilitato per TikTok, c'è un link TikTok, e l'autore non è admin e il bot è admin
  if (groupSettings.antitiktok && isTikTokLink && !isAdmin && isBotAdmin) {
    if (isBotAdmin) {
      // Incrementa il numero di avvisi dell'utente
      global.db.data.users[message.sender].warn += 1;

      // Elimina il messaggio contenente il link TikTok
      await conn.sendMessage(message.chat, {
        delete: {
          remoteJid: message.chat,
          fromMe: false,
          id: messageId,
          participant: participant,
        },
      });

      // Recupera il numero di avvisi dell'utente
      let userWarnings = global.db.data.users[message.sender].warn;
      let userName = global.db.data.users[message.sender];

      // Se l'utente ha meno del numero massimo di avvisi
      if (userWarnings < warningThreshold) {
        let warningMessage = {
          key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo',
          },
          message: {
            locationMessage: {
              name: "Warning",
              jpegThumbnail: await (await fetch('https://telegra.ph/file/5dd0169efd3a5c1b99017.png')).buffer(),
              vcard: `BEGIN:VCARD
VERSION:1 0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`,
            },
          },
          participant: '0@s.whatsapp.net',
        };

        // Invia un messaggio di avviso all'utente
        conn.sendMessage(
          message.chat,
          `⚠ LINK TIKTOK NON CONSENTITO
           *${userName.warn} warnings remaining*`,
          warningMessage
        );
      } else {
        // Se l'utente ha raggiunto il limite di avvisi, resetta il contatore
        global.db.data.users[message.sender].warn = 0;
        message.reply("⛔ UTENTE RIMOSSO DOPO 3 AVVERTIMENTI");
        await conn.sendMessage(message.chat, [message.sender], 'User Removed');
      }
    }
  }

  return true;
}

