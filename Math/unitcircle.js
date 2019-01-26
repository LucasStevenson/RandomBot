const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let pics = ['degree.png', 'radian.png', 'unitcircle.png', 'unitcirclesincos.jpeg'];

    valueToUse = pics[Math.floor(Math.random() * pics.length)];
    
    let mEmbed = new discord.RichEmbed()
    .setTitle('Triginometry!')
    .setColor("RANDOM")
    .setURL('https://en.wikipedia.org/wiki/Trigonometry')
    .attachFile("./pics/" + valueToUse)
    .setImage("attachment://" + valueToUse)

    return message.channel.send(mEmbed);
}
module.exports.help = {
    name: "ucircle"
}