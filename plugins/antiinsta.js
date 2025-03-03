/**
 * Funzione per gestire il rilevamento dei link di Instagram e l'invio di avvisi o la rimozione dei messaggi.
 * Questa funzione controlla se in un messaggio di gruppo è stato condiviso un link a Instagram
 * e, se la funzione anti-instagram è attiva, incrementa il contatore di avvisi dell'utente.
 * Se l'utente non è amministratore e il bot ha i permessi, elimina il messaggio e invia un avviso.
 *
 * @param {Object} message - L'oggetto messaggio ricevuto.
 * @param {Object} options - Opzioni aggiuntive.
 * @param {boolean} options.isAdmin - Indica se il mittente è un amministratore.
 * @param {Object} options.groupMetadata - Metadati del gruppo.
 * @param {boolean} options.isBotAdmin - Indica se il bot ha i permessi di amministratore.
 * @returns {boolean} - Ritorna true per continuare il processo del messaggio.
 */
export async function before(message, { isAdmin, groupMetadata, isBotAdmin }) {
  // Se il messaggio è inviato da Baileys (il client) e proviene da se stesso, non fare nulla
  if (message.isBaileys && message.fromMe) return true;
  // Se il messaggio non proviene da un gruppo, esci
  if (!message.isGroup) return false;

  // Ottieni le impostazioni della chat dal database globale
  const chatSettings = global.db.data.chats[message.chat];
  const warningLimit = 5; // Numero massimo di avvisi consentiti
  const messageKeyId = message.key.id; // ID univoco del messaggio
  // Impostazioni aggiuntive (se necessarie)
  const settings = global.db.data.settings[this.user.jid] || {};

  // Regex per rilevare i link di Instagram
  const instagramRegex = /instagram\.com/i;
  // Verifica se il messaggio contiene un link di Instagram
  const instagramLinkFound = instagramRegex.exec(message.text);
  const instagramDomain = "instagram.com";

  // Se l'utente è amministratore e la funzione anti-instagram è attiva,
  // e il messaggio contiene "instagram.com" (ad esempio per configurare la funzione),
  // non interveniamo
  if (isAdmin && chatSettings.antiinsta && message.text.includes(instagramDomain)) return true;

  // Se la funzione anti-instagram è attiva, viene trovato un link di Instagram,
  // l'utente non è amministratore e il bot ha i permessi amministrativi
  if (chatSettings.antiinsta && instagramLinkFound && !isAdmin && isBotAdmin) {
    // Incrementa il contatore di avvisi per l'utente
    global.db.data.users[message.sender].warn += 1;

    // Elimina il messaggio contenente il link
    await conn.sendMessage(message.chat, {
      delete: {
        remoteJid: message.chat,
        fromMe: false,
        id: messageKeyId,
        participant: message.sender
      }
    });

    // Ottieni il numero attuale di avvisi dell'utente
    let currentWarnings = global.db.data.users[message.sender].warn;
    let userData = global.db.data.users[message.sender];

    // Se il numero di avvisi è inferiore al limite, invia un messaggio di avviso
    if (currentWarnings < warningLimit) {
      // Scarica un'immagine da utilizzare come miniatura per l'avviso
      const warningImage = await (await fetch('https://telegra.ph/file/e12aae9f5ea6c2e5e52aa.png')).buffer();

      // Crea il contenuto del messaggio di avviso, inclusa una vCard (contatto)
      let warningContent = {
        key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
        message: {
          locationMessage: {
            name: "𝐀𝐧𝐭𝐢 - 𝐈𝐧𝐬𝐭𝐚",
            jpegThumbnail: warningImage,
            vcard:
              'BEGIN:VCARD\n' +
              'VERSION:1.0\n' +
              'N:;Unlimited;;;\n' +
              'FN:Unlimited\n' +
              'ORG:Unlimited\n' +
              'TITLE:\n' +
              'item1.TEL;waid=19709001746:+1 (970) 900-1746\n' +
              'item1.X-ABLabel:Unlimited\n' +
              'X-WA-BIZ-DESCRIPTION:ofc\n' +
              'X-WA-BIZ-NAME:Unlimited\n' +
              'END:VCARD'
          }
        },
        participant: "0@s.whatsapp.net"
      };

      // Invia il messaggio di avviso come risposta nel gruppo
      conn.reply(
        message.chat,
        '⚠ LINK INSTAGRAM NON SONO PERMESSI. FAI .setig PER IMPOSTARE INSTAGRAM\n*' +
          userData.warn +
          '* ° 𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐎 ',
        warningContent
      );
    }
    // (Eventualmente, se si desidera rimuovere l'utente dopo un certo numero di avvisi, si può aggiungere:
    // else {
    //   global.db.data.users[message.sender].warn = 0;
    //   await conn.sendMessage(message.chat, '⛔ AVVISO: Hai superato il limite di avvisi. Azione intrapresa.', {
    //     delete: {
    //       remoteJid: message.chat,
    //       fromMe: false,
    //       id: messageKeyId,
    //       participant: message.sender
    //     }
    //   });
    //   await conn.groupParticipantsUpdate(message.chat, [message.sender], 'remove');
    // }
    // )
  }

  return true;
}
