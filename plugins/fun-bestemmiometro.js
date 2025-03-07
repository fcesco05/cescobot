async function handler(m) {
  if (!m.isGroup) return; // Only works in groups

  let user = global.db.data.users[m.sender];
  if (!user) return; // If the user isn't in the database, do nothing.

  if (user.bestemmiometro && /(porco dio|porcodio|dio bastardo|dio cane|porcamadonna|madonnaporca|porca madonna|madonna porca|dio cristo|diocristo|dio maiale|diomaiale|jesucristo|jesu cristo|cristo madonna|madonna impanata|dio cristo|cristo dio|dio frocio|dio gay|dio madonna|dio infuocato|dio crocifissato|madonna puttana|madonna vacca|madonna inculata|maremma maiala|padre pio|jesu impanato|jesu porco|porca madonna|diocane|madonna porca|dio capra|capra dio|padre pio ti spio)/i.test(m.text)) {

    if (!global.db.data.users[m.sender]) {
      global.db.data.users[m.sender] = {};
    }

    if (!global.db.data.users[m.sender].blasphemy){
      global.db.data.users[m.sender].blasphemy = 0;
    }
    global.db.data.users[m.sender].blasphemy++;

    if (global.db.data.users[m.sender].blasphemy === 1) {
      let mention = '@' + m.sender.split('@')[0];
      let message = {
        key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
        message: {
          locationMessage: {
            name: '𝐁𝐞𝐬𝐭𝐞𝐦𝐦𝐢𝐨𝐦𝐞𝐭𝐫𝐨',
            jpegThumbnail: await (await fetch('https://telegra.ph/file/ba01cc1e5bd64ca9d65ef.jpg')).buffer(),
            vcard: 'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD',
          },
        },
        participant: '0@s.whatsapp.net',
      };
      m.reply({ text: mention + ' hai tirato ', mentions: [m.sender] }, { quoted: message });
    }

    if (global.db.data.users[m.sender].blasphemy > 1) {
      let mention = '@' + m.sender.split('@')[0];
      let message = {
        key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
        message: {
          locationMessage: {
            name: '𝐁𝐞𝐬𝐭𝐞𝐦𝐦𝐢𝐨𝐦𝐞𝐭𝐫𝐨',
            jpegThumbnail: await (await fetch('https://telegra.ph/file/ba01cc1e5bd64ca9d65ef.jpg')).buffer(),
            vcard: 'BEGIN:VCARD\x0aVERSION:1.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD',
          },
        },
        participant: '0@s.whatsapp.net',
      };
      m.reply({ text: mention + ' hai tirato la sua prima bestemmia ' + global.db.data.users[m.sender].blasphemy + ' bestemmie', mentions: [m.sender] }, { quoted: message });
    }
  }
}

export default handler;
