// Funzione per deoffuscare le stringhe (non necessaria per la comprensione del codice)
(function (_0x12ada3, _0x2848aa) {
    const _0x25efdf = _0x3db3, _0x2cf951 = _0x12ada3();
    while (!![]) {
        try {
            const _0x492ffa = -parseInt(_0x25efdf(0xf3)) / 0x1 + parseInt(_0x25efdf(0xdd)) / 0x2 - parseInt(_0x25efdf(0xe6)) / 0x3 - parseInt(_0x25efdf(0xed)) / 0x4 - parseInt(_0x25efdf(0xe0)) / 0x5 - parseInt(_0x25efdf(0xeb)) / 0x6 + parseInt(_0x25efdf(0xe7)) / 0x7;
            if (_0x492ffa === _0x2848aa) break; else _0x2cf951['push'](_0x2cf951['shift']());
        } catch (_0x57ebd1) {
            _0x2cf951['push'](_0x2cf951['shift']());
        }
    }
}(_0x5b66, 0xbcd14));

function _0x3db3(_0x1bb6c4, _0x5a25c4) {
    const _0x5b66ed = _0x5b66();
    return _0x3db3 = function (_0x3db3ea, _0x4f9af5) {
        _0x3db3ea = _0x3db3ea - 0xd8;
        let _0x51e7fa = _0x5b66ed[_0x3db3ea];
        return _0x51e7fa;
    }, _0x3db3(_0x1bb6c4, _0x5a25c4);
}

// Espressione regolare per rilevare link di gruppi WhatsApp
let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

function _0x5b66() {
    const _0x236025 = ['Halo', 'chats', '1447664GlkZMx', 'data', 'sender', 'restrict', 'key', 'https://telegra.ph/file/a3b727e38149464863380.png', 'antiLink', 'reply', 'isGroup', 'sendMessage', 'https://chat.whatsapp.com', '229082snqQAz', 'text', 'isBaileys', '6227940WXMDaG', 'includes', 'https://chat.whatsapp.com/', 'user', '404', 'buffer', '3583551GtkkmK', '44002063YDdZAC', 'exec', '0@s.whatsapp.net', 'chat', '6752016MNrVPW', 'BEGIN:VCARD\x0aVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD', '2456196fJjQSR', 'participant', 'fromMe', '⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐀𝐋𝐓𝐑𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈 ⚠'];
    _0x5b66 = function () { return _0x236025; };
    return _0x5b66();
}

// Funzione principale per gestire l'anti-link
export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true; // Ignora i messaggi del bot stesso
    if (!m.isGroup) return false; // Ignora i messaggi in chat private

    let chatData = global.db.data.chats[m.chat]; // Dati del gruppo dal database
    let senderJid = m.key.participant; // JID del mittente
    let messageId = m.key.id; // ID del messaggio
    let settings = global.db.data.settings[this.user.jid] || {}; // Impostazioni del bot

    const linkMatch = linkRegex.exec(m.text); // Verifica se il messaggio contiene un link di gruppo WhatsApp
    const whatsappLinkPrefix = 'https://chat.whatsapp.com/';

    // Se l'admin o il bot stesso invia un link, o se l'anti-link è disattivato, ignora
    if (isAdmin && chatData.antiLink && m.text.includes(whatsappLinkPrefix)) return;

    // Se l'anti-link è attivo e viene rilevato un link di gruppo
    if (chatData.antiLink && linkMatch && !isAdmin) {
        if (isBotAdmin) {
            // Verifica se il link è un invito generato dal bot stesso
            const inviteCode = 'https://chat.whatsapp.com/' + await this.groupInviteCode(m.chat);
            if (m.text.includes(inviteCode)) return true;
        }

        // Se il bot è admin e l'impostazione "restrict" è attiva
        if (isBotAdmin && settings.restrict) {
            // Invia un avviso e elimina il messaggio
            let fakeContact = {
                key: {
                    participants: '0@s.whatsapp.net',
                    fromMe: false,
                    id: 'Halo'
                },
                message: {
                    locationMessage: {
                        name: '𝐀𝐧𝐭𝐢 - 𝐋𝐢𝐧𝐤 ',
                        jpegThumbnail: await (await fetch('https://telegra.ph/file/a3b727e38149464863380.png')).buffer(),
                        vcard: 'BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
                    }
                },
                participant: '0@s.whatsapp.net'
            };
            this.sendMessage(m.chat, '⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐀𝐋𝐓𝐑𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈 ⚠', fakeContact);
            await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: messageId, participant: senderJid } });

            // Rimuove il mittente dal gruppo
            let removalResult = await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (removalResult[0].status === '404') return; // Se l'utente non viene trovato, ignora
        } else {
            // Se "restrict" è disattivato, ignora
            if (!settings.restrict) return;
        }
    }
    return true; // Continua l'esecuzione
}
