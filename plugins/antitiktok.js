// Regex per rilevare i link di TikTok
const tiktokRegex = /vm\.tiktok\.com/i;

/**
 * Funzione per gestire il rilevamento dei link di TikTok e l'invio di avvisi
 * o la rimozione dei messaggi.
 *
 * Se la funzione antitiktok è attiva e viene trovato un link TikTok,
 * il bot incrementa il contatore di avvisi dell'utente. Se il numero
 * di avvisi è inferiore al limite, viene inviato un messaggio di avviso;
 * se supera il limite, l'utente viene rimosso dal gruppo.
 *
 * @param {Object} message - L'oggetto messaggio ricevuto.
 * @param {Object} options - Opzioni aggiuntive.
 * @param {boolean} options.isAdmin - Indica se il mittente è amministratore.
 * @param {Object} options.groupMetadata - Metadati del gruppo.
 * @param {boolean} options.isBotAdmin - Indica se il bot ha i permessi di amministratore.
 * @returns {boolean} - Ritorna true per continuare il processo del messaggio.
 */
export async function before(message, { isAdmin, groupMetadata, isBotAdmin }) {
  // Se il messaggio è inviato dal client (Baileys) e proviene dal bot stesso, non interveniamo.
  if (message.isBaileys && message.fromMe) return true;
  // Se il messaggio non proviene da un gruppo, non eseguiamo alcuna azione.
  if (!message.isGroup) return false;

  // Recupera le impostazioni della chat dal database globale
  const chatSettings = global.db.data.chats[message.chat];
  // Imposta il numero massimo di avvisi consentiti prima di intraprendere azioni più drastiche
  const warningLimit = 5;
  // Recupera l'ID del messaggio e del mittente
  const messageId = message.id;
  const senderId = message.sender;

  // Se il messaggio contiene il comando "antitiktok" (per esempio per attivare/disattivare la funzione)
  // e il mittente è amministratore, non interveniamo.
  const commandString = "antitiktok";
  if (isAdmin && chatSettings.antitiktok && message.text.includes(commandString)) return true;

  // Verifica se il messaggio contiene un link di TikTok
  const containsTiktokLink = tiktokRegex.test(message.text);

  // Se la funzione antitiktok è attiva, viene trovato un link di TikTok,
  // l'utente non è amministratore e il bot ha i permessi amministrativi:
  if (chatSettings.antitiktok && containsTiktokLink && !isAdmin && isBotAdmin) {
    // Incrementa il contatore di avvisi per l'utente
    global.db.data.users[senderId].warn += 1;

    // Elimina il messaggio contenente il link di TikTok
    await conn.sendMessage(message.chat, {
      delete: {
        remoteJid: message.chat,
        fromMe: false,
        id: messageId,
        participant: senderId
      }
    });

    // Recupera il numero attuale di avvisi per l'utente
    const currentWarnings = global.db.data.users[senderId].warn;
    const userData = global.db.data.users[senderId];

    // Se il numero di avvisi è inferiore al limite, invia un messaggio di avviso
    if (currentWarnings < warningLimit) {
      // Scarica l'immagine da utilizzare come miniatura per il messaggio di avviso
      const warningImage = await (await fetch('https://telegra.ph/file/5dd0169efd3a5c1b99017.png')).buffer();

      // Crea il contenuto del messaggio di avviso, includendo una vCard
      const warningMessage = {
        key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
        message: {
          locationMessage: {
            name: "𝐀𝐧𝐭𝐢 - 𝐓𝐢𝐤𝐓𝐨𝐤",
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

      // Invia il messaggio di avviso al gruppo
      conn.sendMessage(
        message.chat,
        '⚠ LINK TIKTOK NON SONO PERMESSI.\nHai accumulato ' + currentWarnings + ' avviso/i.',
        warningMessage
      );
    }
    // Se il numero di avvisi ha raggiunto o superato il limite,
    // resetta il contatore e rimuove l'utente dal gruppo
    else {
      global.db.data.users[senderId].warn = 0;
      await conn.sendMessage(
        message.chat,
        '⛔ AVVISO: Hai superato il limite di avvisi. Azione intrapresa.',
        {
          delete: {
            remoteJid: message.chat,
            fromMe: false,
            id: messageId,
            participant: senderId
          }
        }
      );
      await conn.groupParticipantsUpdate(message.chat, [senderId], 'remove');
    }
  }
  return true;
}
