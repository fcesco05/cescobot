import fetch from 'node-fetch'; // Per scaricare immagini da internet

let handler = async (m, { conn, usedPrefix }) => {

  // Messaggio finto con un'immagine
  let fakeMessage = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: "𝐌𝐞𝐧𝐮 𝐎𝐰𝐧𝐞𝐫",
        jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        vcard: `BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  };

  // Menu dei comandi dell'owner (il capo del bot!)
  let ownerMenu = `
────────────────
> *𝐏𝐚𝐧𝐞𝐥𝐥𝐨 𝐝𝐢 𝐜𝐨𝐧𝐭𝐫𝐨𝐥𝐥𝐨 𝐎𝐰𝐧𝐞𝐫*
────────────────
⤷ *Comandi disponibili:*

> ${usedPrefix}impostanome
> ${usedPrefix}resettanome
> ${usedPrefix}gestisci @
> ${usedPrefix}setgruppi
> ${usedPrefix}aggiungigruppi @
> ${usedPrefix}resetgruppi @
> ${usedPrefix}setpp (immagine)
> ${usedPrefix}banuser @
> ${usedPrefix}unbanuser @
> ${usedPrefix}blockuser @
> ${usedPrefix}unblockuser @
> ${usedPrefix}pulizia (+)
> ${usedPrefix}out
> ${usedPrefix}prefisso (?)
> ${usedPrefix}resettaprefisso
> ${usedPrefix}godmode {autoadmin}
> ${usedPrefix}azzera @
> ${usedPrefix}aggiungi (numero messaggi) @
> ${usedPrefix}rimuovi (numero messaggi) @
> ${usedPrefix}flood
> ${usedPrefix}nuke
> ${usedPrefix}addowner @
> ${usedPrefix}delowner @
> ${usedPrefix}downall
> ${usedPrefix}upall
> ${usedPrefix}blocklist
> ${usedPrefix}banlist
> ${usedPrefix}bigtag
> ${usedPrefix}lock
> ${usedPrefix}safe
> ${usedPrefix}sponsor
> ${usedPrefix}getplugin
> ${usedPrefix}getfile
> ${usedPrefix}saveplugin 
> ${usedPrefix}deleteplugin
> ${usedPrefix}nome <testo>
> ${usedPrefix}bio <testo>
────────────────
 cescobot
`;

  // Prende il nome del bot dalle impostazioni
  let botName = global.db.data.nomedelbot || " cescobot ";

  // Invia il messaggio con il menu all'utente
  await conn.sendMessage(m.chat, {
    text: ownerMenu,
    contextInfo: {
      mentionedJid: conn.parseMention(wm),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363341274693350@newsletter",
        serverMessageId: '',
        newsletterName: botName
      }
    }
  }, {
    quoted: fakeMessage
  });
};

// Imposta le proprietà del comando
handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(owner|menuowner|pannello)$/i;

export default handler;

// Funzione per formattare il tempo (non usata nel codice principale)
function clockString(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor(ms / 60000) % 60;
  let seconds = Math.floor(ms / 1000) % 60;
  return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
}
