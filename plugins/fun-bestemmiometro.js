const handler = async (message) => {
  const userData = global.db.data.users[message.sender];
  
  // Se non c'è testo nel messaggio, non fare nulla
  if (!message.text) return null;

  // Controlla se l'utente ha attivato il filtro per bestemmie
  if (userData.bestemmiometro && /(?:porco dio|porcodio|dio bastardo|dio cane|dio porco|dio maiale|porca madonna|oid ocrop|madonna puttana|...)/i.test(message.text)) {
    // Incrementa il numero di bestemmie dell'utente
    userData.blasphemyCount = (userData.blasphemyCount || 0) + 1;

    // Se l'utente ha detto una bestemmia per la prima volta
    if (userData.blasphemyCount === 1) {
      const messageToSend = {
        key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
        message: {
          locationMessage: {
            name: 'Warning',
            jpegThumbnail: await (await fetch('https://telegra.ph/file/ba01cc1e5bd64ca9d65ef.jpg')).buffer(),
            vcard: 'BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD',
          },
        },
        participant: '0@s.whatsapp.net',
      };

      // Invia un avviso con una foto di profilo e un vCard
      conn.sendMessage(message.chat, {
        text: `⚠️ @${message.sender} si è incazzat e ha tirato la sua prima bestemmia.`,
        mentions: [message.sender],
      }, { quoted: messageToSend });
    }

    // Se l'utente ha detto più di una bestemmia
    if (userData.blasphemyCount > 1) {
      const messageToSend = {
        key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
        message: {
          locationMessage: {
            name: 'Warning',
            jpegThumbnail: await (await fetch('https://telegra.ph/file/ba01cc1e5bd64ca9d65ef.jpg')).buffer(),
            vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD',
          },
        },
        participant: '0@s.whatsapp.net',
      };

      // Invia un avviso di bestemmia
      conn.sendMessage(message.chat, {
        text: `⚠️ @${message.sender} ha tirato ${userData.blasphemyCount} bestemmie.`,
        mentions: [message.sender],
      }, { quoted: messageToSend });
    }
  }
};

export default handler;

// Funzione per scegliere un elemento random da un array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
