import { performance } from "perf_hooks";

// Funzione per selezionare un elemento casuale da un array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

let handler = async (message, { conn, text }) => {
    // Messaggi personalizzati
    let message1 = `🤟🏻 Inizio una serie di ditalino per *${text}*...`;
    let message2 = `👆🏻 Preparati!`;
    let message3 = `✌🏻 Si comincia...`;
    let message4 = `☝🏻 Quasi finito...`;
    let message5 = `✌🏻 Il momento clou!`;
    let message6 = `👋🏻 Finito?`;
    let message7 = `👋🏻 Ancora un attimo...`;
    let message8 = `✌🏻 Wow, sembra divertente!`;
    let message9 = `🤟🏻 Ci siamo quasi...`;
    let message10 = `☝🏻 Incredibile!`;
    let message11 = `🤟🏻 Epico!`;
    let message12 = `👋🏻 Ahahah, ancora!`;

    // Sequenza dei messaggi
    await message.reply(message1);
    await message.reply(message2);
    await message.reply(message3);
    await message.reply(message4);
    await message.reply(message5);
    await message.reply(message6);
    await message.reply(message7);
    await message.reply(message8);
    await message.reply(message9);
    await message.reply(message10);
    await message.reply(message11);
    await message.reply(message12);

    // Calcolo del tempo
    let startTime = performance.now();
    let endTime = performance.now();
    let elapsedTime = "" + (endTime - startTime);
    let resultMessage = `✨ *${text}* è venuta😛! Dopo *${elapsedTime}ms*!`;

    conn.reply(message.chat, resultMessage, message);
};

handler.command = ["ditalino"];
handler.tags = ["fun"];
export default handler;
