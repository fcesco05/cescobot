/**
 * Blasphemy Handler per il bot WhatsApp.
 * Il codice controlla se un messaggio in un gruppo contiene bestemmie, 
 * aggiorna il contatore delle bestemmie per l'utente e invia un messaggio di avviso.
 */

const blasphemyRegex = /(?:porco dio|porcodio|dio bastardo|dio cane|porcamadonna|madonnaporca|porca madonna|madonna porca|dio cristo|diocristo|dio maiale|diomaiale|jesucristo|jesu cristo|cristo madonna|madonna impanata|dio cristo|cristo dio|dio frocio|dio gay|dio madonna|dio infuocato|dio crocifissato|madonna puttana|madonna vacca|madonna inculata|maremma maiala|padre pio|jesu impanato|jesu porco|Dio porco|Porco dio|Porca madonna| Madonna porca|porca madonna|diocane|madonna porca|dio capra|capra dio|porcoddio|dio negro|padre pio ti spio)/i;

const vcardData = `BEGIN:VCARD
VERSION:1.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`;

const thumbnailURL = 'https://telegra.ph/file/ba01cc1e5bd64ca9d65ef.jpg';

/**
 * Funzione principale per gestire il messaggio.
 * @param {Object} message - Il messaggio ricevuto dal bot.
 */
async function handleMessage(message) {
  // Controlla se il messaggio proviene da un gruppo.
  if (!message.isGroup) return null;

  // Ottieni i dati dell'utente dal database.
  let user = global.db.data.users[message.sender];
  if (!user) return null;

  // Controlla se il messaggio contiene del testo.
  if (!message.text) return null;

  // Se l'utente ha attivato la funzione "bestemmiometro" e il testo contiene bestemmie…
  if (user.bestemmiometro && blasphemyRegex.test(message.text)) {
    // Incrementa il contatore di bestemmie per l'utente.
    user.blasphemy = (user.blasphemy || 0) + 1;

    // Prepara il messaggio di avviso in base al numero di bestemmie
    let warningText;
    if (user.blasphemy === 1) {
      warningText = `@${message.sender.split('@')[0]} 𝐡𝐚 𝐭𝐢𝐫𝐚𝐭𝐨 𝐥𝐚𝐬𝐮𝐚 𝐩𝐫𝐢𝐦𝐚 𝐛𝐞𝐬𝐭𝐞𝐦𝐦𝐢𝐚`;
    } else {
      warningText = `@${message.sender.split('@')[0]} 𝐡𝐚 𝐭𝐢𝐫𝐚𝐭𝐨 ${user.blasphemy} 𝐛𝐞𝐬𝐭𝐞𝐦𝐦𝐢𝐞`;
    }

    // Costruisci un messaggio quotato che contiene una "locationMessage"
    // con un thumbnail e una vCard (es. per visualizzare un banner).
    let quotedMessage = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        // Usa un ID diverso per il primo avviso
        id: user.blasphemy === 1 ? '231747LNxhie' : 'Halo'
      },
      message: {
        locationMessage: {
          name: '𝐁𝐞𝐬𝐭𝐞𝐦𝐦𝐢𝐨𝐦𝐞𝐭𝐫𝐨',
          jpegThumbnail: await (await fetch(thumbnailURL)).buffer(),
          vcard: vcardData
        }
      },
      participant: '0@s.whatsapp.net'
    };

    // Invia il messaggio di avviso nel gruppo, menzionando l'utente.
    conn.sendMessage(
      message.chat,
      {
        text: warningText,
        mentions: [...warningText.matchAll(/@([0-9]{5,16}|0)/g)].map(match => match[1] + '@s.whatsapp.net')
      },
      { quoted: quotedMessage }
    );
  }
}

export default handleMessage;

/**
 * Funzione di utilità per restituire un elemento casuale da un array.
 * @param {Array} array - L'array da cui prelevare un elemento casuale.
 * @returns {any} - Un elemento casuale dall'array.
 */
function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
