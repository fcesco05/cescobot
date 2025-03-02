import { smsg } from './lib/simple.js'
import { format } from 'util' 
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'

const { proto } = (await import('@whiskeysockets/baileys')).default
const èNumero = x => typeof x === 'number' && !isNaN(x)
const ritardo = ms => èNumero(ms) && new Promise(resolve => setTimeout(function () {
clearTimeout(this)
resolve()
}, ms))

export async function gestore(chatUpdate) {
this.msgqueque = this.msgqueque || []
this.uptime = this.uptime || Date.now()
if (!chatUpdate)
return
    this.pushMessage(chatUpdate.messages).catch(console.error)
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m)
return;
if (global.db.data == null)
await global.loadDatabase()       
try {
m = smsg(this, m) || m
if (!m)
return
m.exp = 0
m.biscotti = false
try {
let utente = global.db.data.users[m.sender]
if (typeof utente !== 'object')
  
global.db.data.users[m.sender] = {}
if (utente) {
if (!èNumero(utente.exp))
utente.exp = 0
if (!èNumero(utente.biscotti))
utente.biscotti = 10
if (!('muto' in utente))
utente.muto = false
if (!('premium' in utente)) 
utente.premium = false
if (!utente.premium) 
utente.premiumTime = 0
if (!('registrato' in utente))
utente.registrato = false
if (!utente.registrato) {
if (!('nome' in utente))
utente.nome = m.name
if (!èNumero(utente.eta))
utente.eta = -1
if (!èNumero(utente.regTime))
utente.regTime = -1
}
if (!èNumero(utente.afk))
utente.afk = -1
if (!('afkMotivo' in utente))
utente.afkMotivo = ''
if (!('bannato' in utente))
utente.bannato = false
if (!('usaDocumento' in utente))
utente.usaDocumento = false
if (!èNumero(utente.livello))
utente.livello = 0
if (!èNumero(utente.banca))
utente.banca = 0
} else
                global.db.data.users[m.sender] = {
exp: 0,
biscotti: 10,
muto: false,
registrato: false,
nome: m.name,
eta: -1,
regTime: -1,
afk: -1,
afkMotivo: '',
bannato: false,
usaDocumento: false,
banca: 0,
livello: 0,
}
let chat = global.db.data.chats[m.chat]
if (typeof chat !== 'object')
global.db.data.chats[m.chat] = {}
if (chat) {
if (!('èBannato' in chat))
chat.èBannato = false
if (!('sAutoresponder' in chat))
chat.sAutoresponder = ''
if (!('benvenuto' in chat))
chat.benvenuto = true
if (!('autoLevelUp' in chat))
chat.autoLevelUp = false
if (!('autoAccetta' in chat))
chat.autoAccetta = false
if (!('autoRifiuta' in chat))
chat.autoRifiuta = false
if (!('autoresponder' in chat))
chat.autoresponder = false
if (!('audio' in chat))
chat.audio = false
if (!('rilevamento' in chat))
chat.rilevamento = true
if (!('antifalso' in chat))
chat.antifalso = false
if (!('antiBot' in chat))
chat.antiBot = false
if (!('antiBot2' in chat))
chat.antiBot2 = false
if (!('modalitàAdmin' in chat))                     
chat.modalitàAdmin = false   
if (!('antiLink' in chat))
chat.antiLink = false
if (!('modalitàHorny' in chat))
chat.modalitàHorny = false
if (!('reazione' in chat))
chat.reazione = false
if (!('simi' in chat))
chat.simi = false
if (!('antiver' in chat))
chat.antiver = true
if (!('elimina' in chat))
chat.elimina = false
if (!èNumero(chat.scadenza))
chat.scadenza = 0
} else
global.db.data.chats[m.chat] = {
èBannato: false,
sAutoresponder: '',
benvenuto: true,
autoLevelUp: false,
autoresponder: false,
elimina: false,
autoAccetta: false,
autoRifiuta: false,
antifalso: false,
audio: false,
rilevamento: true,
antiBot: false,
antiBot2: false,
modalitàAdmin: false,
antiLink: false,
simi: false,
antiver: true,
modalitàHorny: false, 
reazione: false,
scadenza: 0, 
}
var impostazioni = global.db.data.settings[this.user.jid]
if (typeof impostazioni !== 'object') global.db.data.settings[this.user.jid] = {}
if (impostazioni) {
if (!('self' in impostazioni)) impostazioni.self = false
if (!('restrict' in impostazioni)) impostazioni.restrict = false
if (!('jadibotmd' in impostazioni)) impostazioni.jadibotmd = true
if (!('autobio' in impostazioni)) impostazioni.autobio = false
if (!('antiPrivato' in impostazioni)) impostazioni.antiPrivato = false
if (!('autoread' in impostazioni)) impostazioni.autoread = false
if (!('autoread2' in impostazioni)) impostazioni.autoread2 = false
if (!('antiSpam' in impostazioni)) impostazioni.antiSpam = false
} else global.db.data.settings[this.user.jid] = {
self: false,
restrict: false,
jadibotmd: true,
autobio: false,
antiPrivato: false,
autoread: false,
autoread2: false,
antiSpam: false,
stato: 0
}
} catch (e) {
console.error(e)
}
if (opts['nyimak'])  return
if (!m.fromMe && opts['self'])  return
if (opts['swonly'] && m.chat !== 'status@broadcast')  return
if (typeof m.text !== 'string')
m.text = ''

let _utente = global.db.data && global.db.data.users && global.db.data.users[m.sender]

const èROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const èOwner = èROwner || m.fromMe
const èMods = èOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const èPrems = èROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || _utente.prem == true

if (opts['queue'] && m.text && !(èMods || èPrems)) {
let coda = this.msgqueque, tempo = 1000 * 5
const idPrecedente = coda[coda.length - 1]
coda.push(m.id || m.key.id)
setInterval(async function () {
if (coda.indexOf(idPrecedente) === -1) clearInterval(this)
await ritardo(tempo)
}, tempo)
}

if (m.isBaileys || èBaileysFail && m?.sender === this?.this?.user?.jid) {
return
}
m.exp += Math.ceil(Math.random() * 10)
// Antispam 2
if (user.antispam2 && isROwner) return
let time = global.db.data.users[m.sender].spam + 3000
if (new Date - global.db.data.users[m.sender].spam < 3000) return console.log(`[ SPAM ]`) 
global.db.data.users[m.sender].spam = new Date * 1
}
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let setting = global.db.data.settings[this.user.jid]
if (name != 'Grupo•unbanchat.js' && chat?.isBanned)
return 
if (name != 'Owner•unbanuser.js' && user?.banned)
return
}
let hl = _prefix 
let adminMode = global.db.data.chats[m.chat].modoadmin
let mini = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mini) return   
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { 
fail('owner', m, this)
continue
}
if (plugin.rowner && !isROwner) { 
fail('rowner', m, this)
continue
}
if (plugin.owner && !isOwner) { 
fail('owner', m, this)
continue
}
if (plugin.mods && !isMods) { 
fail('mods', m, this)
continue
}
if (plugin.premium && !isPrems) { 
fail('premium', m, this)
continue
}
if (plugin.group && !m.isGroup) { 
fail('group', m, this)
continue
} else if (plugin.botAdmin && !isBotAdmin) { 
fail('botAdmin', m, this)
continue
} else if (plugin.admin && !isAdmin) { 
fail('admin', m, this)
continue
}
if (plugin.private && m.isGroup) {
fail('private', m, this)
continue
}
if (plugin.register == true && _user.registered == false) { 
fail('unreg', m, this)
continue
}
m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 
if (xp > 200)
m.reply('chirrido -_-')
else
m.exp += xp
if (!isPrems && plugin.cookies && global.db.data.users[m.sender].cookies < plugin.cookies * 1) {
conn.reply(m.chat, `Hai esaurito le tue *🍁YotsuCoins*`, m)
continue
}
let extra = {
match,
usedPrefix,
noPrefix,
_args,
args,
command,
text,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}
try {
await plugin.call(this, m, extra)
if (!isPrems)
m.cookies = m.cookies || plugin.cookies || false
} catch (e) {
m.error = e
console.error(e)
if (e) {
let text = format(e)
for (let key of Object.values(global.APIKeys))
text = text.replace(new RegExp(key, 'g'), 'Amministratore')
m.reply(text)
}
} finally {
if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra)
} catch (e) {
console.error(e)
}}
if (m.cookies)
conn.reply(m.chat, `Hai usato *${+m.cookies}* 🍁`, m)
}
break
} }
} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1)
this.msgqueque.splice(quequeIndex, 1)
}
let user, stats = global.db.data.stats
if (m) { let utente = global.db.data.users[m.sender]
if (utente.muto == true) {
let bang = m.key.id
let cancellazzione = m.key.participant
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: cancellazzione }})
}
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.cookies -= m.cookies * 1
}

let stat
if (m.plugin) {
let now = +new Date
if (m.plugin in stats) {
stat = stats[m.plugin]
if (!isNumber(stat.total))
stat.total = 1
if (!isNumber(stat.success))
stat.success = m.error != null ? 0 : 1
if (!isNumber(stat.last))
stat.last = now
if (!isNumber(stat.lastSuccess))
stat.lastSuccess = m.error != null ? 0 : now
} else
stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now
}
stat.total += 1
stat.last = now
if (m.error == null) {
stat.success += 1
stat.lastSuccess = now
}}}

try {
if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
} catch (e) { 
console.log(m, m.quoted, e)}
let settingsREAD = global.db.data.settings[this.user.jid] || {}  
if (opts['autoread']) await this.readMessages([m.key])
if (settingsREAD.autoread2) await this.readMessages([m.key])  

if (db.data.chats[m.chat].reaction && m.text.match(/(ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify|ai|yaemori|a|s)/gi)) {
let emot = pickRandom(["🍟", "😃", "😄", "😁", "😆", "🍓"])
if (!m.fromMe) return this.sendMessage(m.chat, { react: { text: emot, key: m.key }})
}
function pickRandom(list) { return list[Math.floor(Math.random() * list.length)]}
}}

export async function deleteUpdate(message) {
try {
const { fromMe, id, participant } = message
if (fromMe) return 
let msg = this.serializeM(this.loadMessage(id))
let chat = global.db.data.chats[msg?.chat] || {}
if (!chat?.delete) return 
if (!msg) return 
if (!msg?.isGroup) return 
const antideleteMessage = `╭•┈•〘❌ ANTI ELIMINAZIONE ❌〙•┈• ◊
│❒ UTENTE:
│• @${participant.split`@`[0]}
│
│❒ Ha appena eliminato un messaggio
│Reinviando... ⏱️
╰•┈•〘❌ ANTI ELIMINAZIONE ❌〙•┈• ◊`.trim();
await this.sendMessage(msg.chat, {text: antideleteMessage, mentions: [participant]}, {quoted: msg})
this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
} catch (e) {
console.error(e)
}}

global.dfail = (type, m, conn) => {
const msg = {
rowner: '「🍁」 *Questa funzione può essere usata solo dal mio creatore*\n\n> Develop @Alba070503.', 
owner: '「🍁」 *Questa funzione può essere usata solo dal mio sviluppatore.*', 
admin: '「🍁」 *Questo comando può essere usato solo dagli admin.*', 
botAdmin: '「🍁」 *Per usare questa funzione devo essere admin.*', 
unreg: '「🍁」 *Hey! Non sei registrato, registrati per usare questa funzione*\n\n*/reg nome.età*\n\n*_❕ Esempio_* : */reg Cesco.19*'
}[type];
if (msg) return conn.reply(m.chat, msg, m).then(_ => m.react('✖️'))}
