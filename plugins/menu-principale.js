import fetch from 'node-fetch'; // Assicurati di aver installato node-fetch: npm install node-fetch

let handler = async (message, { conn, usedPrefix }) => {
  const senderName = await conn.getName(message.sender);
  const targetJid = message.quoted
    ? message.quoted.sender
    : message.mentionedJid && message.mentionedJid[0]
      ? message.mentionedJid[0]
      : message.fromMe
        ? conn.user.jid
        : message.sender;


  const profilePicUrl = (await conn.profilePictureUrl(targetJid, "image").catch(() => null)) || "./src/avatar_contact.png";
  let profilePicBuffer;
  if (profilePicUrl !== "./src/avatar_contact.png") {
    profilePicBuffer = await (await fetch(profilePicUrl)).buffer();
  } else {
    profilePicBuffer = await (await fetch("https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png")).buffer();
  }

  const botName = global.db.data.nomedelbot || "cescobot";

  // Comandi con formattazione stilizzata
  const commandList = `
        ✨ *Menu Principale* ✨
        ────────────────────────
        ➤ ${usedPrefix}proprietario
        ➤ ${usedPrefix}funzioni
        ➤ ${usedPrefix}admin
        ➤ ${usedPrefix}gruppo
        ➤ ${usedPrefix}owner
        ➤ ${usedPrefix}crediti
        ➤ ${usedPrefix}supporto
        ➤ ${usedPrefix}botinfo       Dev by Gab

        ────────────────────────
         cescobot   -  Versione: ${vs}
        `.trim();

  // Versione Origin Bot
  await conn.sendMessage(message.chat, {
    text: commandList,
    contextInfo: {
      mentionedJid: conn.parseMention(commandList),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363341274693350@newsletter',
        serverMessageId: '',
        newsletterName: botName
      },
      externalAdReply: {
        title: senderName,
        body: `Versione Bot: ${vs}`,
        mediaType: 1,
        renderLargerThumbnail: false,
        previewType: "PHOTO",
        thumbnail: profilePicBuffer,
        sourceUrl: 'ok'
      }
    }
  });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;


function clockString(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor(milliseconds / 60000) % 60;
  let seconds = Math.floor(milliseconds / 1000) % 60;

  console.log({ ms: milliseconds, h: hours, m: minutes, s: seconds });

  return [hours, minutes, seconds].map(timeUnit => timeUnit.toString().padStart(2, '0')).join(':');
}
