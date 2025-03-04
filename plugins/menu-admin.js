// Import delle librerie necessarie
import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import baileys from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

/**
 * Funzione di utilità per convertire millisecondi in formato "hh:mm:ss"
 * @param {number} ms - Millisecondi da convertire
 * @returns {string} Tempo formattato come "hh:mm:ss"
 */
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map(unit => unit.toString().padStart(2, '0')).join(':');
}

/**
 * Handler per il comando "menuadm" / "admin"
 * Mostra un menu amministrativo con informazioni sul bot e comandi disponibili.
 * 
 * @param {Object} message - Oggetto del messaggio ricevuto
 * @param {Object} param1 - Oggetto contenente il riferimento alla connessione e il prefisso usato
 * @param {Object} param1.conn - Istanza della connessione (client WhatsApp)
 * @param {string} param1.usedPrefix - Prefisso utilizzato per il comando
 */
const handler = async (message, { conn, usedPrefix }) => {
  // Calcola l'uptime del processo (in millisecondi) e lo formatta
  const uptimeMs = process.uptime() * 1000;
  const uptimeStr = clockString(uptimeMs);

  // Ottieni il numero totale di utenti dal database globale
  const totalUsers = Object.entries(global.db.data.users).length;

  // Ottieni la lista di tutte le chat dalla connessione
  const allChats = Object.entries(conn.chats).filter(([jid, chat]) => jid && chat.isChats);
  // Separa le chat di gruppo e quelle private
  const groupChats = allChats.filter(([jid]) => jid.endsWith('@g.us'));
  const privateChats = allChats.filter(([jid]) => jid.includes('@s.whatsapp.net'));

  // Ottieni alcune statistiche di sistema
  const memoryUsage = process.memoryUsage();
  // Recupera le impostazioni del bot (ad es. restrizioni) per l'utente corrente
  const settings = global.db.data.settings[conn.user.jid] || {};
  const { restrict } = settings;
  // Altre impostazioni globali, per esempio l'autoread
  const { autoread } = global;

  // Misura la latenza (tempo di risposta) in millisecondi
  const startTime = performance.now();
  const endTime = performance.now();
  const latency = endTime - startTime;

  // Esempio di recupero di qualche dato (ad es. il nome dell'utente)
  const senderName = await conn.getName(message.sender);

  // Costruisci un messaggio "quotato" che verrà usato per dare un effetto banner
  const quotedMsg = {
    key: {
      // Imposta un partecipante fittizio
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: '𝐌𝐞𝐧𝐮 Admin',
        // Scarica l'immagine da usare come thumbnail
        jpegThumbnail: await (await fetch('https://i.ibb.co/HpkzmrMZ/cescobot.jpg')).buffer(),
        // VCard (contatto) fittizio
        vcard: `BEGIN:VCARD
VERSION:1.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  };

  // Costruisci il testo del menu amministrativo
  let menuText = (
    '\n『💬』 ══ •⊰✰⊱• ══ 『💬』\n' +
    '- ' + usedPrefix + 'command1  - Descrizione comando 1\n' +
    '- ' + usedPrefix + 'command2  - Descrizione comando 2\n' +
    '- ' + usedPrefix + 'command3  - Descrizione comando 3\n' +
    '- ' + usedPrefix + 'command4  - Descrizione comando 4\n' +
    '\nUptime: ' + uptimeStr +
    '\nUtenti totali: ' + totalUsers +
    '\nChat di gruppo: ' + groupChats.length +
    '\nChat private: ' + privateChats.length +
    '\nLatenza: ' + latency.toFixed(2) + ' ms'
  ).trim();

  // Nome del bot preso dalle impostazioni, oppure un valore di default
  const botName = global.db.data.settings[conn.user.jid]?.nomedelbot || 'ChatUnity-Bot';

  // Invia il messaggio con informazioni contestuali (ad esempio, menzionando i contatti)
  conn.sendMessage(message.chat, {
    text: menuText,
    contextInfo: {
      // Menziona tutti gli utenti presenti nel testo (se necessario)
      mentionedJid: conn.parseMention(menuText),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: '' + botName
      }
    }
  }, { quoted: quotedMsg });
};

// Configurazioni del comando handler
handler.help = ['menuadm'];
handler.tags = ['menuadm'];
handler.command = /^(menuadm|admin)$/i;

export default handler;
