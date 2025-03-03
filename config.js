import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

//BETA: Se vuoi evitare di scrivere il numero che sarà il bot nella console, aggiungilo da qui:
//Si applica solo per l'opzione 2 (essere bot con un codice di testo di 8 cifre)
global.botNumberCode = '' //Esempio: +393755853799 
global.confirmCode = ''

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

global.owner = [
   ['393755853799', '𝚌𝚛𝚎𝚊𝚍𝚘𝚛✐', true],
   ['3755853799', '𝚘wn𝚎𝚛 ඩා', true],

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

global.mods = []
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

//cambia a true se il bot rileva i propri comandi.
global.isBaileysFail = false
global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.7'
global.languaje = 'italiano'
global.nameqr = 'cescobot✿'
global.namebot = 'cescobot✿ᩚ'
global.sessions = 'cescobotSession'
global.jadi = 'cescoJadiBot'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

global.packname = 'cescobot✿'
global.botname = 'cescobot✻'
global.wm = 'cescobot❋'
global.author = '𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 @cesco'
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

global.imagen1 = fs.readFileSync('./src/img/photo.jpg')
global.imagen2 = fs.readFileSync('./src/img/moonbot.jpg')
global.imagen3 = fs.readFileSync('./src/img/sinfoto.jpg')
global.welcome = fs.readFileSync('./src/img/betatest.jpg')
global.bye = fs.readFileSync('./src/img/betatest.jpg')
global.catalogo = fs.readFileSync('./src/img/nuevobot.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

global.grupo = 'https://whatsapp.com/channel/0029Vb2xynG9MF8tPyNWoE35' //
global.md = 'https://github.com/ilcescodicosenz/cescobot' 
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

global.ch = {
ch1: '120363198641161536@newsletter',
ch2: '120363160031023229@newsletter',
ch3: '120363263466636910@newsletter',
ch4: '120363370415738881@newsletter',
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '❀ sᥙ́⍴ᥱr ᥕһᥲ𝗍sᥲ⍴⍴ ᑲ᥆𝗍 ☄︎', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⋆

global.esti = { key: {participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: {"videoMessage": { "title": `cescobot`, "h": `Hm
