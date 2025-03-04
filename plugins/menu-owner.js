(function(array, valore) {
  const funzione = ottieniParola;
  const arr = array();
  while (!![]) {
    try {
      const risultato = -parseInt(funzione(0x165)) / 0x1 * (-parseInt(funzione(0x16b)) / 0x2) + parseInt(funzione(0x156)) / 0x3 * (-parseInt(funzione(0x16f)) / 0x4) + parseInt(funzione(0x142)) / 0x5 + parseInt(funzione(0x151)) / 0x6 * (-parseInt(funzione(0x170)) / 0x7) + parseInt(funzione(0x161)) / 0x8 + parseInt(funzione(0x13f)) / 0x9 * (-parseInt(funzione(0x148)) / 0xa) + parseInt(funzione(0x17b)) / 0xb;
      if (risultato === valore) break;
      else arr.push(arr.shift());
    } catch (errore) {
      arr.push(arr.shift());
    }
  }
})(ottieniArrayStringhe, -0xb * 0xcf09 + -0x375cf + 0x143ec5);

import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import { default as baileys } from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

let gestore = async (messaggio, { conn, usedPrefix: prefissoUsato }) => {
  const ottieni = ottieniParola;
  const funzioni = {
    'PBOGy': (a, b) => a * b,
    'yhBxL': (a) => a(),
    'FZtnx': ottieni(0x150),
    'fRkLB': (a, b) => a - b,
    'joqRC': ottieni(0x14a),
    'IJOSu': 'Halo',
    'HhDkh': ottieni(0x152),
    'pLKRv': ottieni(0x15e)
  };

  let utilizzoMemoria = funzioni[ottieni(0x154)](process[ottieni(0x149)](), -0x11d * -0x23 + -0x2617 + 0x308);
  let tempoDiAttivita = funzioni[ottieni(0x177)](clockString, utilizzoMemoria);
  let utentiBannati = Object[ottieni(0x158)](global.db.dati.utenti)[ottieni(0x160)];

  const gruppi = Object[ottieni(0x146)](conn[ottieni(0x16d)])[ottieni(0x162)](([id, dati]) => id && dati[ottieni(0x143)]);
  const gruppiPubblici = gruppi[ottieni(0x162)](([id]) => id[ottieni(0x16c)]('@g.us'));
  const gruppiNewsletter = gruppi['filter'](([id]) => id['endsWith'](ottieni(0x139)));
  const informazioniSistema = process[ottieni(0x15d)]();
  let { restrict: restrizioni } = global.db.dati.impostazioni[conn[ottieni(0x14d)][ottieni(0x175)]] || {};
  let { autoread: letturaAutomatica } = global[ottieni(0x14f)];
  let testoMenu = funzioni[ottieni(0x157)];

  let inizio = performance.now();
  let fine = performance.now();
  let tempoDiEsecuzione = funzioni[ottieni(0x147)](fine, inizio);
  let messaggioDiPosizione = await conn[ottieni(0x16a)](messaggio[ottieni(0x178)]);
  let messaggioDiContesto = {
    'key': {
      'participants': funzioni[ottieni(0x174)],
      'fromMe': false,
      'id': funzioni[ottieni(0x172)]
    },
    'message': {
      'locationMessage': {
        'name': ottieni(0x169),
        'jpegThumbnail': await (await fetch(funzioni[ottieni(0x176)]))[ottieni(0x138)](),
        'vcard': 'BEGIN:VCARD\x0aVERSION:1.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD'
      }
    },
    'participant': funzioni[ottieni(0x174)]
  };
  let menu = (ottieni(0x13e) + prefissoUsato + ottieni(0x13d) + prefissoUsato + 'resettanome\x0a-\x20' + prefissoUsato + ottieni(0x15c) + prefissoUsato + 'setgruppi\x0a-\x20' + prefissoUsato + 'aggiungigruppi\x20@\x0a-\x20' + prefissoUsato + ottieni(0x167) + prefissoUsato + ottieni(0x14e) + prefissoUsato + 'banuser\x0040\x0a-\x20' + prefissoUsato + ottieni(0x168) + prefissoUsato + ottieni(0x155) + prefissoUsato + ottieni(0x171) + prefissoUsato + ottieni(0x17f) + prefissoUsato + 'getfile\x0a-\x20' + prefissoUsato + 'salva\x20(plugin)\x0a-\x20' + prefissoUsato + ottieni(0x153) + prefissoUsato + ottieni(0x16e) + prefissoUsato + ottieni(0x173) + prefissoUsato + ottieni(0x17c) + prefissoUsato + ottieni(0x163) + prefissoUsato + ottieni(0x141) + prefissoUsato + ottieni(0x159) + prefissoUsato + ottieni(0x13a) + prefissoUsato + ottieni(0x144) + prefissoUsato + 'rimuovi\x20(num. messaggi)\x20@\x0a『』 ══ •⊰✰⊱• ══ 『』')['trim']();
  let nomeBot = global.db.dati.nomedelbot || 'cescobot\x20';

  conn.sendMessage(messaggio.chat, {
    'text': menu,
    'contextInfo': {
      'mentionedJid': conn[ottieni(0x15b)](wm),
      'forwardingScore': 0x1,
      'isForwarded': !![],
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': funzioni[ottieni(0x13c)],
        'serverMessageId': '',
        'newsletterName': '' + nomeBot
      }
    }
  }, { 'quoted': messaggioDiContesto });
};

gestore.help = [ottieniParola(0x17a)];
gestore.tags = ['menu'];
gestore.command = /^(owner|menuowner|pannello)$/i;

export default gestore;

function clockString(millisecondi) {
  const ottieni = ottieniParola;
  const funzioni = {
    'IpObQ': (a, b) => a / b,
    'Gymwe': (a, b) => a % b,
    'YJFJI': (a, b) => a / b
  };

  let ore = Math[ottieni(0x164)](fun
