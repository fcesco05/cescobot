const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

export async function before(message, { isAdmin, isBotAdmin }) {
    if (message.isBaileys && message.fromMe) return true;
    if (!message.isGroup) return false;
    
    let chatSettings = global.db.data.chats[message.chat];
    let senderId = message.key.participant;
    let messageId = message.key.id;
    let groupSettings = global.db.data.settings[this.user.jid] || {};
    
    const foundLink = linkRegex.exec(message.text);
    const whatsappGroupUrl = "https://chat.whatsapp.com";
    
    if (isAdmin && chatSettings.antiLink && message.text.includes(whatsappGroupUrl)) return;
    
    if (chatSettings.antiLink && foundLink && !isAdmin) {
        if (isBotAdmin) {
            const botInviteLink = "https://chat.whatsapp.com/" + await this.groupInviteCode(message.chat);
            if (message.text.includes(botInviteLink)) return true;
        }

        if (isBotAdmin && groupSettings.restrict) {
            let warningMessage = {
                key: {
                    fromMe: false,
                    id: messageId,
                    participant: senderId,
                },
                message: {
                    locationMessage: {
                        name: "Anti-Link Alert",
                        jpegThumbnail: await (await fetch("https://telegra.ph/file/a3b727e38149464863380.png")).buffer(),
                    }
                }
            };
            
            conn.sendMessage(message.chat, "⚠ LINK DI ALTRI GRUPPI NON SONO CONSENTITI", warningMessage);
            
            await conn.sendMessage(message.chat, {
                delete: {
                    remoteJid: message.chat,
                    fromMe: false,
                    id: messageId,
                    participant: senderId,
                }
            });
            
            let removalResponse = await conn.groupParticipantsUpdate(message.chat, [senderId], 'remove');
            if (removalResponse[0]?.status === "404") return;
        } else {
            if (!groupSettings.restrict) return;
        }
    }
    
    return true;
}
