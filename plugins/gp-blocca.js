let handler = async (m, { conn, usedPrefix, command }) => {
  // Verifica che il comando venga usato in un gruppo
  if (!m.isGroup) return m.reply('Questo comando può essere utilizzato solo nei gruppi!');
  
  // Verifica che il mittente sia amministratore
  if (!m.isAdmin) return m.reply('Non sei amministratore o non hai i permessi per utilizzare questo comando!');
  
  // Verifica che il bot sia amministratore
  if (!conn.user.admin) return m.reply('Non ho i permessi necessari per eseguire questo comando (non sono admin)!');

  // Imposta il gruppo in modalità "announcement" (solo admin possono scrivere)
  await conn.groupSettingUpdate(m.chat, 'announcement');
  
  // Invia il messaggio di conferma con newsletter forwarding
  let nomeDelBot = global.db.data.settings[conn.user.jid]?.nomedelbot || 'cescobot';
  await conn.sendMessage(m.chat, {
    text: '🚫 Il gruppo è stato chiuso! Solo gli admin possono scrivere ora.',
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

handler.help = ['blocca'];
handler.tags = ['admin'];
handler.command = /^(blocca)$/i;
handler.admin = true;
handler.botAdmin = true;

export default handler;
