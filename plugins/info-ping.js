import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

let handler = async (m, { conn }) => {
  try {
    // 1. Calcola l'uptime (tempo di attività) del bot
    const uptimeMs = process.uptime() * 1000; // Ottiene l'uptime in millisecondi
    const uptimeStr = formatUptime(uptimeMs); // Formatta l'uptime in ore:minuti:secondi

    // 2. Calcola la velocità di esecuzione del comando (ping)
    const startTime = performance.now(); // Registra il tempo di inizio
    const endTime = performance.now();   // Registra il tempo di fine
    const speed = (endTime - startTime).toFixed(4); // Calcola la differenza (tempo di esecuzione)

    // 3. Ottieni il nome del bot (o usa un nome predefinito)
    const botName = global.db?.data?.nomedelbot || "CescoBot";

    // 4. Scarica un'immagine di stato (o usa un'immagine predefinita)
    const imageResponse = await fetch('https://telegra.ph/file/2f38b3fd9cfba5935b496.jpg');

    if (!imageResponse.ok) {
      throw new Error(`Errore durante la richiesta: ${imageResponse.status}`);
    }

    // 5. Calcola l'ora di attivazione del bot
    const botStartTime = new Date(Date.now() - uptimeMs);
    const activationTime = botStartTime.toLocaleString('it-IT', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // 6. Crea il messaggio di stato
    const message = `
⏳══ •⊰✰⊱• ══ ⏳

CescoBot
𝐀𝐓𝐓𝐈𝐕𝐈𝐓𝐀: ${uptimeStr}
𝐀𝐓𝐓𝐈𝐕𝐀𝐓𝐎 𝐈𝐋: ${activationTime}
𝐕𝐄𝐋𝐎𝐂𝐈𝐓𝐀: ${speed} secondi

⏳══ •⊰✰⊱• ══ ⏳
CescoBot *Versione* 1.0
`.trim();

    // 7. Invia il messaggio di stato
    await conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        mentionedJid: conn.parseMention(botName),
        forwardingScore: 1,
        isForwarded: true,
      },
    });
  } catch (err) {
    console.error("Errore nell'handler:", err);
    await conn.sendMessage(m.chat, {text: "Si è verificato un errore."});
  }
};

// Funzione per formattare l'uptime in ore:minuti:secondi
function formatUptime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Funzione per aggiungere uno zero iniziale se necessario
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

handler.help = ['stato', 'ping', 'info'];
handler.tags = ['info'];
handler.command = /^(stato|ping|info)$/i;

export default handler;
