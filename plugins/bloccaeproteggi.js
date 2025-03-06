let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Controlla se il comando viene usato in un gruppo
    if (!m.isGroup) return m.reply('Questo comando può essere utilizzato solo nei gruppi!');

    // Se il mittente non è amministratore, invia il messaggio di errore
    if (!m.isAdmin) return m.reply('Non sei amministratore o non hai i permessi per utilizzare questo comando!');

    // Verifica il tipo di azione: bloccare o sbloccare
    if (!text || (text !== 'blocca' && text !== 'sblocca')) {
        return m.reply('Devi specificare "blocca" o "sblocca" per usare questo comando!');
    }

    if (text === 'blocca') {
        // Blocca i messaggi nel gruppo (solo gli admin possono scrivere)
        await conn.groupSettingUpdate(m.chat, 'announcement');
        await m.reply('🚫 I messaggi sono stati bloccati nel gruppo! Solo gli admin possono scrivere ora.');
    } else {
        // Sblocca i messaggi nel gruppo (tutti possono scrivere)
        await conn.groupSettingUpdate(m.chat, 'chat');
        await m.reply('✅ I messaggi sono stati sbloccati! Tutti possono scrivere di nuovo.');
    }
};

handler.command = ['proteggi'];
handler.help = ['proteggi'];
handler.tags = ['admin'];
handler.admin = true;

export default handler;
handler.admin = true;

export default handler;
