import { readdirSync, unlinkSync, existsSync, promises as fsPromises, rmSync } from 'fs';
import path from 'path';

const handler = async (message, { conn, usedPrefix }) => {
    if (global.user['id'] !== conn.user['id']) {
        return conn.sendMessage(message.chat, { text: 'Non sei autorizzat stai al tuo posto' }, { quoted: message });
    }

    await conn.sendMessage(message.chat, { text: 'Comando in esecuzione...' }, { quoted: message });

    const sessionFolderPath = './Sessioni/';
    try {
        if (!existsSync(sessionFolderPath)) {
            return await conn.sendMessage(message.chat, { text: 'La cartella Sessioni non esiste o è vuota.' }, { quoted: message });
        }

        const sessionFiles = await fsPromises.readdir(sessionFolderPath);
        let deletedFilesCount = 0;

        for (const file of sessionFiles) {
            if (file !== 'creds.json') {
                await fsPromises.unlink(path.join(sessionFolderPath, file));
                deletedFilesCount++;
            }
        }

        if (deletedFilesCount === 0) {
            await conn.sendMessage(message.chat, { text: 'Le sessioni sono vuote!' }, { quoted: message });
        } else {
            await conn.sendMessage(message.chat, { text: `${deletedFilesCount} archivi nelle sessioni sono stati eliminati.` }, { quoted: message });
        }
    } catch (error) {
        console.error('Errore', error);
        await conn.sendMessage(message.chat, { text: 'Si è verificato un errore durante l\'operazione.' }, { quoted: message });
    }

    const userData = global.db.users[message.sender];
    let userName = global.db.settings.userName || 'Utente';
    let vCardMessage = {
        key: { participants: 'Halo', fromMe: false, id: 'Halo' },
        message: {
            locationMessage: {
                name: '' + userName,
                jpegThumbnail: await (await fetch('https://i.ibb.co/JRc3WH15/cescobot.jpg')).buffer(),
                vcard: 'BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    await conn.sendMessage(message.chat, { text: 'Completato!' }, { quoted: vCardMessage });
};

handler.help = ['del_reg_in_session_owner'];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.isEnabled = true;

export default handler;
