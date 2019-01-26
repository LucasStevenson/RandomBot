const discord = require('discord.js');
const randomColor = require("randomcolor");
const cmds = require("../cmds.json");
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    let helpembed = new discord.RichEmbed()
    .setTitle(`${bot.user.username} Github Link`)
    .setDescription(`__To get the invite link, type **${botconfig.prefix}botinfo**__`)
    .setURL('https://github.com/LucasStevenson/RandomBot')
    .setColor(color)
    .setThumbnail("https://cdn.discordapp.com/attachments/518593740433260565/530495328106053652/thinking_cropped.png")
    .addField(`Admin Commands (${cmds.admin.length})`, cmds.admin.sort().join(', '), true)
    .addField(`Info Commands (${cmds.info.length})`, cmds.info.sort().join(', '), true)
    .addField(`Math Commands (${cmds.math.length})`, cmds.math.sort().join(', '), true)
    .addField(`Say Commands (${cmds.say.length})`, cmds.say.sort().join(', '), true)
    .addField(`Utilities (${cmds.util.length})`, cmds.util.sort().join(', '), true)
    .addField(`Other Commands (${cmds.other.length})`, cmds.other.sort().join(', '))
    .addField(`Music Commands (${cmds.music.length})`, cmds.music.sort().join(', '), true)
    .setFooter("Requested by " + message.author.tag)
    .setTimestamp()
    try{
        await message.author.send(helpembed);
        message.reply("sent ya a DM with the commands");
    } catch (e) {
        return message.channel.send("Couldnt DM the commands to " + "``" + message.author.tag + "``");
    }

}

module.exports.help = {
    name: "help"
}
