// Import delle librerie necessarie
import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import baileys from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

/**
 * Funzione di utilità per convertire un tempo (in millisecondi) nel formato "hh:mm:ss"
 * @param {number} ms - Tempo in millisecondi
 * @returns {string} Tempo formattato (hh:mm:ss)
 */
function clockString(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor(ms / 60000) % 60;
  const seconds = Math.floor(ms / 1000) % 60;
  console.log({ ms, hours, minutes, seconds });
  return [hours, minutes, seconds]
    .map(unit => unit.toString().padStart(2, '0'))
    .join(':');
}

/**
 * Handler per il comando "funzioni".
 * Mostra il menu delle funzionalità (stato delle opzioni attive/disabilitate) insieme ad alcune statistiche.
 *
 * @param {Object} msg - Il messaggio ricevuto
 * @param {Object} param1 - Oggetto contenente la connessione e il prefisso usato
 * @param {Object} param1.conn - L'istanza della connessione (client WhatsApp)
 * @param {string} param1.usedPrefix - Il prefisso usato per attivare il comando
 */
const handler = async (msg, { conn, usedPrefix }) => {
  // Calcola l'uptime del processo in millisecondi e lo formatta
  const uptimeMs = process.uptime() * 1000;
  const formattedUptime = clockString(uptimeMs);

  // Recupera il numero totale di utenti registrati nel database globale
  const totalUsers = Object.entries(global.db.data.users).length;

  // Ottieni la lista di tutte le chat dalla connessione e filtra quelle effettivamente attive
  const allChats = Object.entries(conn.chats).filter(([jid, chat]) => jid && chat.isChats);
  const groupChats = allChats.filter(([jid]) => jid.endsWith('@g.us'));
  const privateChats = allChats.filter(([jid]) => jid.includes('@s.whatsapp.net'));

  // Recupera le impostazioni del bot per l'utente corrente (ad es. restrizioni)
  const settings = global.db.data.settings[conn.user.jid] || {};
  const { restrict } = settings;
  const { autoread } = global;

  // Definisce il percorso di un'immagine predefinita
  const defaultImagePath = './no.png';

  // Misurazione della latenza (latency) tramite performance.now()
  const startTime = performance.now();
  const endTime = performance.now();
  const latency = endTime - startTime;

  // Costruisce un messaggio "quotato" che verrà usato come banner (con immagine e vCard fittizia)
  const quotedMsg = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'menuBanner'
    },
    message: {
      locationMessage: {
        name: '𝐌𝐞𝐧𝐮 delle funzionalità\'',
        // Scarica l'immagine da utilizzare come thumbnail
        jpegThumbnail: await (await fetch('https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg')).buffer()
      }
    },
    participant: '0@s.whatsapp.net'
  };

  // Costruzione del testo del menu, che mostra lo stato (attivo/disabilitato) di diverse funzionalità
  // Qui vengono visualizzati anche alcuni parametri e statistiche
  let menuText = (
    '𝐚𝐭𝐭𝐢𝐯𝐚 antilink: ' + (global.db.data.chats[msg.chat].detect ? '🟢' : '🔴') + ' | ' +
    '𝐠𝐩𝐭: ' + (global.db.data.chats[msg.chat].gpt ? '🟢' : '🔴') + ' | ' +
    '𝐣𝐚𝐝𝐢𝐛𝐨𝐭: ' + (global.db.data.chats[msg.chat].jadibot ? '🟢' : '🔴') + ' » ' + usedPrefix + 'jadibot\n' +
    '𝐦𝐨𝐝𝐨𝐚𝐝𝐦𝐢𝐧: ' + (global.db.data.chats[msg.chat].modoadmin ? '🟢' : '🔴') + ' | ' +
    '𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤: ' + (global.db.data.chats[msg.chat].antiLink ? '🟢' : '🔴') + ' | ' +
    '𝐚𝐧𝐭𝐢𝐢𝐧𝐬𝐭𝐚: ' + (global.db.data.chats[msg.chat].antiinsta ? '🟢' : '🔴') + '\n' +
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
          newsletterName: botName
        }
      }
    },
    { quoted: quotedMsg }
  );
};

// Configurazione del comando: il comando viene attivato con "funzioni"
handler.help = ['funzioni'];
handler.tags = ['funzioni'];
handler.command = /^(funzioni)$/i;

export default handler;
