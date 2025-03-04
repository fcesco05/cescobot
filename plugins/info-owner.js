(function(array, valore) {
  const funzione = ottieniParola;
  const arr = array();
  while (!![]) {
    try {
      const risultato = -parseInt(funzione(0x127)) / 0x1 + -parseInt(funzione(0x130)) / 0x2 * (parseInt(funzione(0x12f)) / 0x3) + parseInt(funzione(0x11c)) / 0x4 * (parseInt(funzione(0x11a)) / 0x5) + -parseInt(funzione(0x129)) / 0x6 + parseInt(funzione(0x128)) / 0x7 * (parseInt(funzione(0x12d)) / 0x8) + -parseInt(funzione(0x11f)) / 0x9 * (parseInt(funzione(0x11e)) / 0xa) + parseInt(funzione(0x120)) / 0xb;
      if (risultato === valore) break;
      else arr.push(arr.shift());
    } catch (errore) {
      arr.push(arr.shift());
    }
  }
})(ottieniArrayStringhe, 0x51488);

function gestore(messaggio) {
  const ottieni = ottieniParola;
  let infoContatto = {
    'key': {
      'partecipanti': ottieni(0x12a),
      'daMe': false,
      'id': ottieni(0x122)
    },
    'message': {
      'extendedTextMessage': {
        'text': ottieni(0x119),
        'vcard': ottieni(0x118)
      }
    },
    'participant': ottieni(0x12a)
  };
  const globaleFiltrato = global['tags']['filter'](([chiave, valore]) => chiave && valore);
  this['inviaContatto'](messaggio['chat'], globaleFiltrato['map'](([chiave, valore]) => [chiave, valore]), infoContatto);
}

gestore['principale'] = ['tags'];
gestore['aiuto'] = ['chat'];
gestore['comando'] = ['proprietario', 'creador', 'dueño', 'fgowner'];

function ottieniArrayStringhe() {
  const arrayStringhe = ['2403618kkIOrP', '0@s.whatsapp.net', 'help', 'chat', '6696iPmJHW', 'tags', '3zdkLgp', '452024pPdPzc', 'BEGIN:VCARD\x0aVERSION:1.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD', '𝐎𝐰𝐧𝐞𝐫\x20𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭', '27085DXPJcB', 'main', '440ADyhZU', 'owner', '1790CNRxOe', '8739PPFDwZ', '7873184bSpQbi', 'sendContact', 'Halo', 'creador', 'filter', 'map', 'dueño', '619353jwuibX', '3689kioSZg'];
  ottieniArrayStringhe = function() {
    return arrayStringhe;
  };
  return ottieniArrayStringhe();
}

function ottieniParola(indice, fittizio) {
  const arr = ottieniArrayStringhe();
  return ottieniParola = function(indice, fittizio) {
    indice = indice - 0x118;
    let valore = arr[indice];
    return valore;
  }, ottieniParola(indice, fittizio);
}

export default gestore;
