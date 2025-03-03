import QRCode from 'qrcode';

const handler = async (m, { conn }) => {
    try {
        // Verifica se il bot è amministratore nel gruppo
        const groupMetadata = await conn.groupMetadata(m.chat);
        const isBotAdmin = groupMetadata.participants.some(p => p.id.includes(conn.user.jid) && p.isAdmin);
        
        if (!isBotAdmin) {
            return m.reply('Il bot deve essere amministratore del gruppo per generare il QR code.');
        }

        // Genera il link d'invito
        const inviteLink = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat);
        
        // Crea il QR Code
        const qrImageBuffer = await QRCode.toBuffer(inviteLink);
        
        // Invia l'immagine del QR Code
        await conn.sendMessage(m.chat, { image: qrImageBuffer, caption: 'Ecco il QR Code del gruppo! Usa questo codice per invitare altre persone.' });
        
    } catch (error) {
        console.error(error);
        m.reply('Errore durante la generazione del QR Code: ' + error.message);
    }
};

handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^linkqr(gro?up)?$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;
