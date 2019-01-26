const discord = require('discord.js');
const randomColor = require('randomcolor');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    var half = ["dumber", "smarter", "thiccer", "friendlier", "gayer", "straighter", "meaner", " more cash money"]
    let percent = Math.floor(Math.random() * 100) + 1

    chance2 = half[Math.floor(Math.random() * half.length)];

     //args[number] just means what number in the order of words will be used. First word of an input is args[0] and plus one from there
    if(!args[0]) return message.channel.send(`You needa compare something... (${botconfig.prefix}compare then 2 names. Ex ${botconfig.prefix}compare yin yang)`)
    if(!args[1]) return message.channel.send(`You need 2 things in order to compare them (${botconfig.prefix}compare then **2** names. Ex ${botconfig.prefix}compare yin yang)`)
    var sembed = new discord.RichEmbed()
    .setColor(color)
    .addField("Comparing stuff", args[0] + " is " + percent + "% " + chance2 + " than " + args[1] + "\n\n Possible random outputs = [dumber, smarter, thiccer, friendlier, gayer, straighter, meaner, cash money]", true)
    .setThumbnail(message.author.displayAvatarURL)
    

    return message.channel.send(sembed);

}

module.exports.help = {
    name: "compare"
}