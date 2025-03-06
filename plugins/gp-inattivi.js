import { areJidsSameUser } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, participants, args, command }) => {
    let userIds = participants.map(user => user.id);
    let targetUsers = text ? text : userIds.length;
    let inactiveCount = 0;
    let inactiveUsers = [];

    for (let i = 0; i < targetUsers; i++) {
        let userInfo = m.isGroup ? participants.find(user => user.id == userIds[i]) : {};
        let userData = global.db.data.users[userIds[i]];

        if ((typeof userData === 'undefined' || userData.whitelist === 0) && !userInfo.isAdmin && !userInfo.isSuperAdmin) {
            if (typeof global.db.data.users[userIds[i]] !== 'undefined') {
                if (!global.db.data.users[userIds[i]].inattivi) {
                    inactiveCount++;
                    inactiveUsers.push(userIds[i]);
                }
            } else {
                inactiveCount++;
                inactiveUsers.push(userIds[i]);
            }
        }
    }

    switch (command) {
        case 'inattivi':
            if (inactiveCount === 0) return conn.reply(m.chat, 'Nessun inattivo trovato.', m);
            m.reply('『💬』 ══ •⊰✰⊱• ══ 『💬』\n𝐑𝐞𝐯𝐢𝐬𝐢𝐨𝐧𝐞 𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢 😴\n' + 
                await conn.getName(m.chat) + '\n\n' + inactiveUsers.length + '\n\n' + 
                inactiveUsers.map(user => `👉🏻 @${user.replace(/@.+/, '')}`).join('\n') + '\n『💬』 ══ •⊰✰⊱• ══ 『💬』', 
                null, { 'mentions': inactiveUsers }
            );
            break;
        
        case 'viainattivi':
            if (inactiveCount === 0) return conn.reply(m.chat, 'Nessun inattivo trovato.', m);
            await m.reply('𝐑𝐈𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐈𝐍𝐀𝐓𝐓𝐈𝐕𝐈 🚫\n\n' + 
                inactiveUsers.map(user => `@${user.replace(/@.+/, '')}`).join('\n') + '\n', 
                null, { 'mentions': inactiveUsers }
            );
            await conn.groupParticipantsUpdate(m.chat, inactiveUsers, 'remove');
            break;
    }
};

handler.command = /^(inattivi|viainattivi)$/i;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
