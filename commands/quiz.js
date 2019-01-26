const discord = require('discord.js');

let channels = [];

const quiz = [
    {q: "How did the spread of Islam affect Indian Ocean commerce? \n\nA) Islamic religious leaders decreed that muslim merchants could have no dealings with non muslim traders \nB) Early rulers of the Arab Empire promoted trade within the empire by banning trade beyond its borders \nC) Islamic rulers were suspicious of merchants and succeded in shutting down all trade on the Silk Road \nD) Muslim Merchants and sailors established communities of traders from East Africa to the south China coast", a: "d"},
    {q: "Constantinople is to Istanbul as New Amsterdam is to\n\nA) Edo\nB) New York\nC) Capetown\nD) St. Maarten", a: "b"},
    {q: "Which of the following most contributed to the spread of Islam around 750 C.E.\n\nA) Early empire-building efforts primarily by the Umayyad Caliphate\nB) Peaceful interactions between cultural groups due to proselytism\nC) Economic exchanges between local communities and Sufi Muslim traders\nD) The spread of the Arabic language, which was used universally across Islamic communities", a: "a"},
    {q: "The most dramatic development of the 1450 to 1750 timeframe was\n\nA) mercantilism\nB) a global trade network\nC) the Industrial Revolution\nD) the spread of universal religions", a: "b"},
    {q: "Ashoka and Constantine are similar in that they\n\nA) moved their capital cities\nB) used religion to unite their empires\nC) were both illiterate\nD) were both assassinated", a: "b"},
    {q: "Confucius would endorse all of the following except\n\nA) a patriarchal society\nB) the dominance of a priestly class\nC) filial piety\nD) respect for the emperor", a: "b"},
    {q: "The Han Empire in China and the Gupta Empire in South Asia were similar in that\n\nA) the Han Empire contained the eastern terminus of the Silk Road and the Gupta Empire contained the western terminus\nB) they both fought each other for control of Southeast Asia\nC) their empires were each thought of as the golden age of their region\nD) they each successfully resisted invasion by Alexander The Great", a: "c"},
    {q: "Which of the following best compares with the spread of Arab culture after 750 C.E.?\n\nA) The initial expansion of the Mongols throughout Eurasia\nB) The early growth of Inca territory in the Andes\nC) The migrations of Bantu speakers in sub-Saharan Africa\nD) The establishment of Jewish communities throughout Eurasia.", a: "d"}
];

const options = {
    max: 1,
    time: 30000,
    errors: ["time"],
};

module.exports.run = async (bot, message, args) => {

    if(channels.includes(message.channel.id)) return message.channel.send("theres already a question on this channel. Answer that one before i gib another one");

    const item = quiz[Math.floor(Math.random() * quiz.length)];
    await message.channel.send(item.q);
    channels.push(message.channel.id);
    try {
        const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
        const winnerMessage = collected.first();
        for (var i = 0; i < channels.length; i++){ 
            if (channels[i] === message.channel.id) {
              channels.splice(i, 1); 
            };
         };
        return message.channel.send({embed: new discord.RichEmbed()
            .setAuthor(`Winner: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
            .setTitle(`Correct Answer: \`${winnerMessage.content.toUpperCase()}\``)
            .setDescription(`Question: ${item.q}`)
            .setColor('D4AF37')
        })
    } catch (e) {
        for (var i = 0; i < channels.length; i++){ 
            if (channels[i] === message.channel.id) {
              channels.splice(i, 1); 
            };
         };
        return message.channel.send({embed: new discord.RichEmbed()
            .setAuthor('No one got the answer in time!')
            .setTitle(`Correct Answer: \`${item.a}\``)
            .setDescription(`Question: ${item.q}`)
        })
    }
}
module.exports.help = {
    name: "test"
}