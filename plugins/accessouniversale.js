module.exports = {
    name: "universal-access",
    description: "Permette a tutti di usare il bot senza restrizioni",
    
    execute: async (msg, sock) => {
        const sender = msg.key.remoteJid; // Identifica l'utente che invia il messaggio

        // Risposta di conferma per l'utente
        await sock.sendMessage(sender, { text: "✅ Ora tutti possono usare il bot senza restrizioni!" });
    }
};
