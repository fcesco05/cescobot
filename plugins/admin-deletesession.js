import { readdirSync, unlinkSync, existsSync, promises as fsPromises, rmSync } from 'fs';
import path from 'path';

const handler = async (message, { conn, usedPrefix }) => {
    if (global.owner?.user?.jid !== conn.user?.jid) {
        return conn.sendMessage(message.chat, { text: "*Utilizza questo comando direttamente nel numero principale del Bot.*" }, { quoted: message });
    }

    await conn.sendMessage(message.chat, { text: "ⓘ Ripristino delle sessioni in corso..." }, { quoted: message });

    const sessionFolder = './Sessioni/';
    try {
        if (!existsSync(sessionFolder)) {
            return await conn.sendMessage(message.chat, { text: "*La cartella Sessioni non esiste o è vuota.*" }, { quoted: message });
        }
        
        const files = await fsPromises.readdir(sessionFolder);
        let deletedCount = 0;
        for (const file of files) {
            if (file !== 'creds.json') {
                await fsPromises.unlink(path.join(sessionFolder, file));
                deletedCount++;
            }
        }

        const responseText = deletedCount === 0
            ? "ⓘ Le sessioni sono vuote ‼️"
            : `ⓘ Sono stati eliminati ${deletedCount} archivi nelle sessioni.`;
        await conn.sendMessage(message.chat, { text: responseText }, { quoted: message });
    } catch (error) {
        console.error('Errore', error);
        await conn.sendMessage(message.chat, { text: "Errore" }, { quoted: message });
    }

    const botInfo = global.db?.nomedelbot || "cescobot";
    const botImage = "https://i.ibb.co/JRc3WH15/cescobot.png";
    const locationMessage = {
        key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
        message: {
            locationMessage: {
                name: botInfo,
                jpegThumbnail: await (await fetch(botImage)).buffer(),
                vcard: `BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nit\nTEL;waid=19709001746:+1 (970) 900-1746\nX-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };

    await conn.sendMessage(message.chat, { text: "ⓘ Ora sarai in grado di leggere i messaggi del bot" }, { quoted: locationMessage });
};

handler.help = ['del_reg_in_session_owner'];
handler.command = ['deletession', 'ds', 'clearallsession'];
handler.admin = true;

export default handler;
