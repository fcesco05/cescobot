import fetch from 'node-fetch'; // Assicurati di aver installato node-fetch: npm install node-fetch

let handler = async (m, { conn, usedPrefix }) => {
  // Crea un messaggio "finto" di posizione per il menu
  let fakeLocationMessage = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: "Menu Gruppo",
        jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    participant: "0@s.whatsapp.net"
  };

  // Crea il testo del menu con la lista dei comandi
  let menuText = `
──────Menu Gruppo─────
- ${usedPrefix}abbraccia @
- ${usedPrefix}lecco/a @
- ${usedPrefix}mordi @
- ${usedPrefix}alcolizzato @
- ${usedPrefix}riscrivi (messaggio)
- ${usedPrefix}meteo (città)
- ${usedPrefix}hd (foto)
- ${usedPrefix}leggi (foto)
- ${usedPrefix}rimuovisfondo (foto)
- ${usedPrefix}sega (nome)
- ${usedPrefix}ditalino (nome)
- ${usedPrefix}insulta (nome)
- ${usedPrefix}qrcode (testo)
- ${usedPrefix}rivela (foto)
- ${usedPrefix}styletext
- ${usedPrefix}calc (1+1)
- ${usedPrefix}msg @
- ${usedPrefix}bello/a @
- ${usedPrefix}gay @
- ${usedPrefix}puttana @
- ${usedPrefix}lesbica @
- ${usedPrefix}insulta @
- ${usedPrefix}stupra @
- ${usedPrefix}frocio @
- ${usedPrefix}odio @
- ${usedPrefix}amore @
- ${usedPrefix}dox @
- ${usedPrefix}id (gruppo)
- ${usedPrefix}handicappato @
- ${usedPrefix}setig
- ${usedPrefix}eliminaig
- ${usedPrefix}tris
- ${usedPrefix}crush @
- ${usedPrefix}topgays
- ${usedPrefix}topnazi
- ${usedPrefix}ttp
- ${usedPrefix}dado
- ${usedPrefix}sticker/s
- ${usedPrefix}tovideo
- ${usedPrefix}togif
- ${usedPrefix}autoadmin
- ${usedPrefix}kebab @
- ${usedPrefix}sayan @
- ${usedPrefix}mordi @
- ${usedPrefix}mira @
- ${usedPrefix}creacoppia
  ──────────────
   cescobot
`.trim();

  // Ottiene il nome del bot dalle impostazioni globali
  let botName = global.db.data.nomedelbot || "cescobot";

  // Invia il messaggio del menu
  conn.sendMessage(m.chat, {
    text: menuText,
    contextInfo: {
      mentionedJid: conn.parseMention(menuText), // Trova e menziona gli utenti nel menu
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363341274693350@newsletter",
        serverMessageId: '',
        newsletterName: '' + botName
      }
    }
  }, {
    quoted: fakeLocationMessage
  });
};

// Configurazione del comando
handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menugruppo|gruppo)$/i;

export default handler;

// Funzione per formattare il tempo (non usata nel menu, ma presente nel codice originale)
function clockString(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor(ms / 60000) % 60;
  let seconds = Math.floor(ms / 1000) % 60;
  console.log({ ms, h: hours, m: minutes, s: seconds });
  return [hours, minutes, seconds].map(part => part.toString().padStart(2, 0)).join(':');
}
