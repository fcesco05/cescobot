const items = ['limite', 'exp'];
const conferma = {};

async function handler(m, { conn, args, usedPrefix, command }) {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje
  const _traduci = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const traduttore = _traduci.plugins.rpg_transfer

  if (conferma[m.sender]) return conn.sendMessage(m.chat, {text: traduttore.testo1, mentions: [m.sender]}, {quoted: m});
  const user = global.db.data.users[m.sender];
  const item = items.filter((v) => v in user && typeof user[v] == 'number');
  const lol = `${traduttore.testo2[0]}
  ${traduttore.testo2[1]} ${usedPrefix + command}*  ${traduttore.testo2[2]} ${traduttore.testo2[3]} [@user]
  ${traduttore.testo2[4]} ${usedPrefix + command} ${traduttore.testo2[5]} @${m.sender.split('@')[0]}

  ${traduttore.testo2[6]}
  ${traduttore.testo2[7]}
  ${traduttore.testo2[8]}
`.trim();
  const type = (args[0] || '').toLowerCase();
  if (!item.includes(type)) return conn.sendMessage(m.chat, {text: lol, mentions: [m.sender]}, {quoted: m});
  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
  if (!who) return conn.sendMessage(m.chat, {text: traduttore.testo3, mentions: [m.sender]}, {quoted: m});
  if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, {text: `${traduttore.testo4[0]} ${who} ${traduttore.testo4[1]}`, mentions: [m.sender]}, {quoted: m});
  if (user[type] * 1 < count) return conn.sendMessage(m.chat, {text: `${traduttore.testo5[0]} ${type} ${traduttore.testo5[1]}`, mentions: [m.sender]}, {quoted: m});
  const confermaMessaggio = `${traduttore.testo6[0]} ${count} ${type} a @${(who || '').replace(/@s\.whatsapp\.net/g, '')}?* 
  ${traduttore.testo6[1]}

  ${traduttore.testo6[2]}* 
  ${traduttore.testo6[3]}
  ${traduttore.testo6[4]}`.trim();
  await conn.sendMessage(m.chat, {text: confermaMessaggio, mentions: [who]}, {quoted: m});
  conferma[m.sender] = { sender: m.sender, to: who, message: m, type, count, timeout: setTimeout(() => (conn.sendMessage(m.chat, {text: '*[❗] Il tempo è scaduto, nessuna risposta ricevuta. Trasferimento annullato.*', mentions: [m.sender]}, {quoted: m}), delete conferma[m.sender]), 60 * 1000)};
}

handler.before = async (m) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje
  const _traduci = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const traduttore = _traduci.plugins.rpg_transfer
  
  if (m.isBaileys) return;
  if (!(m.sender in conferma)) return;
  if (!m.text) return;
  const { timeout, sender, message, to, type, count } = conferma[m.sender];
  if (m.id === message.id) return;
  const user = global.db.data.users[sender];
  const _user = global.db.data.users[to];
  if (/^No|no$/i.test(m.text)) {
    clearTimeout(timeout);
    delete conferma[sender];
    return conn.sendMessage(m.chat, {text: traduttore.testo7, mentions: [m.sender]}, {quoted: m});
  }
  if (/^Si|si$/i.test(m.text)) {
    const previous = user[type] * 1;
    const _previous = _user[type] * 1;
    user[type] -= count * 1;
    _user[type] += count * 1;
    if (previous > user[type] * 1 && _previous < _user[type] * 1) {
      conn.sendMessage(m.chat, {text: `${traduttore.testo8} ${count} ${type} a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, mentions: [to]}, {quoted: m});
    } else {
      user[type] = previous;
      _user[type] = _previous;
      conn.sendMessage(m.chat, {text: `${traduttore.testo9} ${count} ${type} a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, mentions: [to]}, {quoted: m});
    }
    clearTimeout(timeout);
    delete conferma[sender];
  }
};
handler.help = ['transfer'].map((v) => v + ' [tipo] [quantità] [@tag]');
handler.tags = ['xp'];
handler.command = ['payxp', 'transfer', 'darxp', 'transferir'];
handler.disabled = false;
export default handler;

function special(type) {
  const b = type.toLowerCase();
  const special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '');
  return special;
}
function isNumber(x) {
  return !isNaN(x);
}
