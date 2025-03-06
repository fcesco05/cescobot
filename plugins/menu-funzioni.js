import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import baileys from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

/**
 * Converte un tempo in millisecondi nel formato "hh:mm:ss".
 * @param {number} ms - Tempo in millisecondi
 * @returns {string} Tempo formattato come "hh:mm:ss"
 */
function clockString(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor(ms / 60000) % 60;
  const seconds = Math.floor(ms / 1000) % 60;
  console.log({ ms, h: hours, m: minutes, s: seconds });
  return [hours, minutes, seconds]
    .map(unit => unit.toString().padStart(2, '0'))
    .join(':');
}

/**
 * Handler per il comando "funzioni".
 * Visualizza un menu con lo stato (attivo/disabilitato) di varie funzionalità,
 * oltre a statistiche come uptime, latenza e numero di utenti.
 *
 * @param {Object} msg - Il messaggio ricevuto
 * @param {Object} param1 - Oggetto contenente la connessione e il prefisso usato
 * @param {Object} param1.conn - L'istanza della connessione (client WhatsApp)
 * @param {string} param1.usedPrefix - Il prefisso usato per il comando
 */
const handler = async (msg, { conn, usedPrefix }) => {
  // Calcola l'uptime del processo in millisecondi e lo formatta
  const uptimeMs = process.uptime() * 1000;
  const formattedUptime = clockString(uptimeMs);

  // Conta il numero totale di utenti dal database globale
  const totalUsers = Object.entries(global.db.data.users).length;

  // Ottiene tutte le chat dalla connessione e filtra quelle attive
  const allChats = Object.entries(conn.chats).filter(([jid, chat]) => jid && chat.isChats);
  const groupChats = allChats.filter(([jid]) => jid.endsWith('@g.us'));
  const privateChats = allChats.filter(([jid]) => jid.includes('@s.whatsapp.net'));

  // Recupera alcune impostazioni di sistema e del bot
  const settings = global.db.data.settings[conn.user.jid] || {};
  const { restrict } = settings;
  const { autoread } = global;
  const defaultImage = './no.png';

  // Misura la latenza (latency) tramite performance.now()
  const startTime = performance.now();
  const endTime = performance.now();
  const latency = endTime - startTime;

  // Recupera le impostazioni specifiche per la chat (stato delle funzionalità)
  const chatSettings = global.db.data[msg.chat] || {};
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
    audios
  } = chatSettings;

  // Determina l'ID del mittente
  let senderId;
  if (msg.quoted) {
    senderId = msg.quoted.sender;
  } else if (msg.sender) {
    senderId = msg.sender;
  } else if (msg.participant) {
    senderId = msg.participant;
  } else {
    senderId = msg.chat;
  }

  // Ottiene la foto del profilo del mittente (se disponibile)
  const profilePicUrl = await conn.profilePictureUrl(senderId, 'image').catch(() => 'default');
  let avatarBuffer;
  if (profilePicUrl !== 'default') {
    avatarBuffer = await (await fetch(profilePicUrl)).buffer();
  } else {
    avatarBuffer = await (await fetch('https://i.ibb.co/HpkzmrMZ/chatunity-jpg.jpg')).buffer();
  }

  // Crea un messaggio quotato da usare come banner per il menu (con immagine e vCard fittizia)
  const quotedMsg = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'menuBanner'
    },
    message: {
      locationMessage: {
        name: 'Menu delle funzionalità',
        jpegThumbnail: await (await fetch('https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg')).buffer()
      }
    },
    participant: '0@s.whatsapp.net'
  };

  // Costruisce il testo del menu con lo stato delle funzionalità (usando emoji verde per attivo, rosso per disabilitato)
  let menuText = (
    '𝐚𝐭𝐭𝐢𝐯𝐚 antilink: ' + (detect ? '🟢' : '🔴') + ' ' + usedPrefix + '\n' +
    '𝐠𝐩𝐭: ' + (gpt ? '🟢' : '🔴') + ' ' + usedPrefix + '\n' +
    '𝐣𝐚𝐝𝐢𝐛𝐨𝐭: ' + (jadibot ? '🟢' : '🔴') + ' » ' + usedPrefix + 'jadibot\n' +
    '𝐦𝐨𝐝𝐨𝐚𝐝𝐦𝐢𝐧: ' + (modoadmin ? '🟢' : '🔴') + ' ' +
    '𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤: ' + (antiLink ? '🟢' : '🔴') + ' ' +
    '𝐚𝐧𝐭𝐢𝐢𝐧𝐬𝐭𝐚: ' + (antiinsta ? '🟢' : '🔴') + '\n' +
    'Uptime: ' + formattedUptime + '\n' +
    'Utenti totali: ' + totalUsers + '\n' +
    'Chat di gruppo: ' + groupChats.length + '\n' +
    'Chat private: ' + privateChats.length + '\n' +
    'Latenza: ' + latency.toFixed(2) + ' ms'
  ).trim();

  // Recupera il nome del bot dalle impostazioni, oppure usa un valore di default
  const botName = global.db.data.settings[conn.user.jid]?.nomedelbot || 'ChatUnity-Bot';

  // Invia il messaggio del menu con informazioni contestuali (ad es. menzioni e newsletter)
  conn.sendMessage(
    msg.chat,
    {
      text: menuText,
      contextInfo: {
        mentionedJid: conn.parseMention(menuText),
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: '' + botName
        }
      }
    },
    { quoted: quotedMsg }
  );
};

handler.help = ['funzioni'];
handler.tags = ['funzioni'];
handler.command = /^(funzioni)$/i;
export default handler;
