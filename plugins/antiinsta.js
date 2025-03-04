let linkRegex = /instagram.com/i;

export async function before(m, { isAdmin, groupMetadata, isBotAdmin }) {
    // Verifica se il messaggio contiene un link Instagram
    if (m.text && m.text.includes('instagram.com')) return true;

    // Se il messaggio non è un link Instagram, esci
    if (!m.text) return false;

    let chatSettings = global.db.data.chats[m.chat];
    let warnThreshold = 3;
    let participantId = m.participant.id;
    let senderId = m.sender;
    let groupData = global.db.data.users[senderId] || {};

    // Controlla se il messaggio contiene un link Instagram
    let isInstagramLink = linkRegex.test(m.text);
    
    // Se l'admin è attivo e l'anti-instagram è attivato, non fare nulla
    if (isAdmin && chatSettings.antiinsta && m.text.includes('anti-instagram')) return;

    // Se il bot è amministratore e il link è Instagram
    if (chatSettings.antiinsta && isInstagramLink && !isAdmin && isBotAdmin) {
        if (isBotAdmin) {
            // Incrementa il conteggio degli avvisi
            global.db.data.users[senderId].warn += 1;

            // Rimuove il messaggio contenente il link
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.messageId,
                    participant: participantId
                }
            });

            let userWarns = global.db.data.users[senderId].warn;
            let userName = global.db.data.users[senderId].name;

            if (userWarns < warnThreshold) {
                let warningMessage = {
                    key: { participants: m.participant, fromMe: false, id: 'warning' },
                    message: {
                        locationMessage: {
                            name: 'Instagram Link Warning',
                            jpegThumbnail: await (await fetch('https://telegra.ph/file/e12aae9f5ea6c2e5e52aa.png')).buffer(),
                            vcard: 'BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTEL;waid=19709001746:+1 (970) 900-1746\nEND:VCARD'
                        }
                    },
                    participant: m.participant
                };
                
                // Invia un messaggio di avviso
                conn.sendMessage(m.chat, '⚠️ Link Instagram NON CONSENTITI\n' + userName + ' hai violato le regole', warningMessage);
            } else {
                global.db.data.users[senderId].warn = 0;
                conn.sendMessage(m.chat, '⛔ Avviso: Link Instagram rimosso!', [m.sender]);
            }
        }
    }
    
    return true;
}
