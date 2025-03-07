import { readdirSync, unlinkSync, existsSync, promises as fsPromises } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  // Verifica se chi esegue il comando è l'owner del bot
  if (global.owner.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, { text: '*Utilizza questo comando direttamente nel numero principale del Bot.*' }, { quoted: m });
  }

  // Avvisa che il ripristino delle sessioni è in corso
  await conn.sendMessage(m.chat, { text: 'ⓘ Ripristino delle sessioni in corso...' }, { quoted: m });

  const sessionsFolder = './Sessioni/'; // Percorso della cartella delle sessioni

  try {
    // Verifica se la cartella delle sessioni esiste
    if (!existsSync(sessionsFolder)) {
      return await conn.sendMessage(m.chat, { text: '*La cartella Sessioni non esiste o è vuota.*' }, { quoted: m });
    }

    // Legge il contenuto della cartella delle sessioni
    const files = await fsPromises.readdir(sessionsFolder);
    let deletedFilesCount = 0;

    // Itera sui file e li elimina, tranne 'creds.json'
    for (const file of files) {
      if (file !== 'creds.json') {
        await fsPromises.unlink(path.join(sessionsFolder, file));
        deletedFilesCount++;
      }
    }

    // Invia un messaggio in base al numero di file eliminati
    if (deletedFilesCount === 0) {
      await conn.sendMessage(m.chat, { text: 'ⓘ Le sessioni sono vuote ‼️' }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: 'ⓘ Sono stati eliminati ' + deletedFilesCount + ' archivi nelle sessioni' }, { quoted: m });
    }
  } catch (error) {
    // Gestisce eventuali errori durante l'eliminazione dei file
    console.error('Errore', error);
    await conn.sendMessage(m.chat, { text: 'Errore' }, { quoted: m });
  }

  // Crea un messaggio di "contatto" per confermare l'operazione
  const botName = global.db.data.chats[m.chat]?.botName || '  cescobot  ';
  const botNumber = global.db.data.users?.admin || '+1 (970) 900-1746';
  const contactMessage = {
    key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
    message: {
      locationMessage: {
        name: '' + botName,
        jpegThumbnail: await (await fetch('https://qu.ax/cSqEs.jpg')).buffer(),
        vcard: 'BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=' + botNumber.replace(/[^+0-9]/g, '') + ':' + botNumber + '\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD',
      },
    },
    participant: '0@s.whatsapp.net',
  };

  // Invia il messaggio di "contatto"
  await conn.sendMessage(m.chat, { text: 'ⓘ Ora sarai in grado di leggere i messaggi del bot' }, { quoted: contactMessage });
};

// Configurazione del comando
handler.help = ['del_reg_in_session_owner'];
handler.tags = ['owner'];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.owner = true;

export default handler;
