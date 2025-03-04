import fetch from 'node-fetch'; // Assicurati di aver installato node-fetch: npm install node-fetch

let handler = async (m, { conn, usedPrefix }) => {
  // Ottieni le impostazioni del gruppo dal database
  const {
    antiToxic,
    antilinkhard,
    antiPrivate,
    antitraba,
    antiArab,
    antiviewonce,
    isBanned,
    welcome,
    detect,
    sWelcome,
    sBye,
    sPromote,
    sDemote,
    antiLink,
    antilinkbase,
    antitiktok,
    sologruppo,
    soloprivato,
    antiCall,
    modohorny,
    gpt,
    antiinsta,
    antielimina,
    antitelegram,
    antiSpam,
    antiPorno,
    jadibot,
    autosticker,
    modoadmin,
    audios,
  } = global.db.data.chats[m.chat];

  // Determina l'utente di cui mostrare l'avatar
  let userJid = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  // Ottieni l'avatar dell'utente o usa un'immagine predefinita
  const avatarUrl = (await conn.profilePictureUrl(userJid, "image").catch(() => null)) || "cescobot.png";
  let avatarBuffer;
  if (avatarUrl !== "./src/avatar_contact.png") {
    avatarBuffer = await (await fetch(avatarUrl)).buffer();
  } else {
    avatarBuffer = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();
  }

  // Crea un messaggio fittizio con un'immagine
  let fakeMessage = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: "Halo",
    },
    message: {
      locationMessage: {
        name: "𝐌𝐞𝐧𝐮 𝐝𝐞𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚𝐥𝐢𝐭𝐚'",
        jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
      },
    },
    participant: "0@s.whatsapp.net",
  };

  // Crea il messaggio del menu con lo stato delle funzionalità
  let menuMessage = `
──────────────
 ${detect ? '🟢' : '🔴'} » ${usedPrefix}detect
 ${gpt ? '🟢' : '🔴'} » ${usedPrefix}gpt
 ${jadibot ? '🟢' : '🔴'} » ${usedPrefix}jadibot
 ${welcome ? '🟢' : '🔴'} » ${usedPrefix}benvenuto
 ${sologruppo ? '🟢' : '🔴'} » ${usedPrefix}sologruppo
 ${soloprivato ? '🟢' : '🔴'} » ${usedPrefix}soloprivato
 ${modoadmin ? '🟢' : '🔴'} » ${usedPrefix}modoadmin
 ${isBanned ? '🟢' : '🔴'} » ${usedPrefix}bangp
 ${antiPorno ? '🟢' : '🔴'} » ${usedPrefix}antiporno
 ${antiCall ? '🟢' : '🔴'} » ${usedPrefix}anticall
 ${antitraba ? '🟢' : '🔴'} » ${usedPrefix}antitrava
 ${antiArab ? '🟢' : '🔴'} » ${usedPrefix}antipaki
 ${antiLink ? '🟢' : '🔴'} » ${usedPrefix}antilink
 ${antiinsta ? '🟢' : '🔴'} » ${usedPrefix}antiinsta
 ${antitiktok ? '🟢' : '🔴'} » ${usedPrefix}antitiktok
 ${antielimina ? '🟢' : '🔴'} » ${usedPrefix}antielimina
────────────
> ⓘ 𝐈𝐧𝐟𝐨 𝐬𝐮𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢
> 🟢 » 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐞 𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚 
> 🔴 » 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐞 𝐝𝐢𝐬𝐚𝐛𝐢𝐥𝐢𝐭𝐚𝐭𝐚 
────────────
> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨
> ${usedPrefix}attiva antilink
> ${usedPrefix}disabilita antilink
> ⓘ 𝐈𝐧𝐟𝐨 𝐬𝐮𝐥𝐥𝐨 𝐬𝐭𝐚𝐭𝐨
> ${usedPrefix}infostato
──────────────`.trim();

  // Invia il messaggio del menu
  let botName = global.db.data.nomedelbot || " cescobot ";
  conn.sendMessage(m.chat, {
    text: menuMessage,
    contextInfo: {
      mentionedJid: conn.parseMention(wm),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363341274693350@newsletter",
        serverMessageId: '',
        newsletterName: botName,
      },
    },
  }, { quoted: fakeMessage });
};

// Configurazione del comando
handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(funzioni)$/i;

export default handler;

// Funzione per formattare il tempo (non usata nel codice principale)
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
