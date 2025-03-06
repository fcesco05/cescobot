import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';
const configuration = new Configuration({organization: global.openai_org_id, apiKey: global.openai_key});
const openaiii = new OpenAIApi(configuration);
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (usedPrefix == 'a' || usedPrefix == 'A') return;
if (!text) throw `*Fai una domanda o un ordine per attivare la funzione di ChatGpt\n\n❏`    

if (command == 'ia' || command == 'chatgpt') {
try {     
await conn.sendPresenceUpdate('composing', m.chat)

async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: true // true = resultado con url
});
return response.data.result;
} catch (error) {
console.error('Error al obtener:', error);
}}

let query = m.text;
let username = `${m.pushName}`;

let result = await luminsesi(query, username, syms1);
 await m.reply(result)
} catch {
try {
let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/gptweb?text=${text}`) 
let res = await gpt.json()
await m.reply(res.gpt)
/*let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/chatgpt?q=${text}`)import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        await m.reply(`Per favore, inserisci una domanda per far sì che Gemini risponda.\n\nEsempio:\n${usedPrefix + command} Raccomanda un top 10 di film d'azione\n${usedPrefix + command} Codice in JS per un gioco di carte`);
        return;
    }

    try {
        conn.sendPresenceUpdate('composing', m.chat);
        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`);
        var res = await apii.json();
        await m.reply(res.result);
    } catch (e) {
        await conn.reply(m.chat, `Si è verificato un errore. Per favore, riprova più tardi.\n\n#report ${usedPrefix + command}\n\n${wm}`, fkontak, m);
        console.log(`Errore nel comando ${usedPrefix + command}`);
        console.log(e);
    }
};

handler.command = ['bard', 'gemini', 'ia'];
handler.help = ['bard', 'gemini'];
handler.tags = ['herramientas'];

handler.premium = false;

export default handler;
let res = await gpt.json()
await m.reply(res.data)*/
} catch {
}}}

if (command == 'openai' || command == 'ia2' || command == 'chatgpt2') {
conn.sendPresenceUpdate('composing', m.chat);
let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/gptweb?text=${text}`) 
let res = await gpt.json()
await m.reply(res.gpt)
}}
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|ia2)$/i;
export default handler;
