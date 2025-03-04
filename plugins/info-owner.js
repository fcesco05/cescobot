function handler(m) {
  const contactInfo = {
    key: {
      participants: 'owner@s.whatsapp.net',  // ID dell'owner
      fromMe: false,  // Indica che il messaggio non proviene dal bot
      id: 'some_random_id',  // ID del messaggio
    },
    message: {
      extendedTextMessage: {
        text: 'ei come posso aiutarti?',  // Messaggio di risposta
        vcard: 'BEGIN:VCARD\nVERSION:1.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'  // Contatto in formato vCard
      },
    },
    participant: 'owner@s.whatsapp.net',  // ID dell'owner
  };

  const participants = global.plugins.filter(([key, value]) => key && value);
  this.sendMessage(m.chat, participants.map(([key, value]) => [key, value]), contactInfo);
}

handler.tags = ['owner'];
handler.command = ['proprietario', 'help', 'owner', 'fgowner'];

export default handler;
