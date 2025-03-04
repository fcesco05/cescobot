import { readdirSync, unlinkSync, existsSync, promises as fsPromises } from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // Assicurati di aver installato node-fetch: npm install node-fetch

const handler = async (m, { conn, usedPrefix }) => {
    // Verifica se chi esegue il comando è l'admin del bot
    if (global.owner.user.jid !== conn.user.jid) {
        return conn.sendMessage(m.chat, { text: "*Utilizza questo comando direttamente nel numero principale del Bot.*" }, { quoted: m });
    }

    // Informa l'utente che le sessioni verranno ripristinate
    await conn.sendMessage(m.chat, { text: "ⓘ Ripristino delle sessioni in corso..." }, { quoted: m });

    const sessionPath = './cescobotSession/'; // Percorso della cartella delle sessioni

    try {
        // Verifica se la cartella delle sessioni esiste
        if (!existsSync(sessionPath)) {
            return await conn.sendMessage(m.chat, { text: "*La cartella Sessioni non esiste o è vuota.*" }, { quoted: m });
        }

        // Legge il contenuto della cartella delle sessioni
        const files = await fsPromises.readdir(sessionPath);
        let deletedFilesCount = 0;

        // Elimina tutti i file nella cartella delle sessioni (tranne 'creds.json')
        for (const file of files) {
            if (file !== 'creds.json') {
                await fsPromises.unlink(path.join(sessionPath, file));
                deletedFilesCount++;
            }
        }

        // Invia un messaggio in base al numero di file eliminati
        if (deletedFilesCount === 0) {
            await conn.sendMessage(m.chat, { text: "ⓘ Le sessioni sono vuote ‼️" }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: "ⓘ Sono stati eliminati " + deletedFilesCount + " archivi nelle sessioni" }, { quoted: m });
        }
    } catch (error) {
        console.error('Errore', error);
        await conn.sendMessage(m.chat, { text: "Errore" }, { quoted: m });
    }

    // Invia un messaggio di conferma con un contatto fittizio
    const botName = global.db.data.chats[m.chat].nomedelbot || " cescobot ";
    const fakeContact = {
        key: {
            participants: "0@s.whatsapp.net",
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: '' + botName,
                jpegThumbnail: await (await fetch('https://qu.ax/cSqEs.jpg')).buffer(),
                vcard: `BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };
    await conn.sendMessage(m.chat, { text: "ⓘ Ora sarai in grado di leggere i messaggi del bot" }, { quoted: fakeContact });
};

// Configurazione del comando
handler.help = ['del_reg_in_session_owner'];
handler.tags = ['admin'];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.owner = true;

export default handler;
