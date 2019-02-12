const discord = require('discord.js');
const randomColor = require('randomcolor');
const moment = require('moment');
const cmds = require("../cmds.json");
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    let totalCmds = cmds.admin.length + cmds.info.length + cmds.math.length + cmds.say.length + cmds.other.length + cmds.util.length + cmds.music.length;

    let users = 0;
    
    bot.guilds.map(g => users += g.memberCount);

    let bicon = bot.user.displayAvatarURL;
    let botembed = new discord.RichEmbed()
    .setTitle(`${bot.user.username} Github Link`)
    .setURL('https://github.com/LucasStevenson/RandomBot')
    .setColor(color)
    .setThumbnail(bicon)
    .addField("Created on", moment(bot.user.createdAt).format('llll'), true)
    .addField("Prefix", `[  **${botconfig.prefix}**  ]`, true)
    .addField("Users", users, true)
    .addField("Channels", bot.channels.size, true)
    .addField("Number of servers", `${bot.user.username} is currently on **${bot.guilds.size}** servers`)
    .addField("Developer", 'Tal#6551', true)
    .addField("# of Commands", `${totalCmds} in total`, true)
    .setFooter(`Say ${botconfig.prefix}help for commands!`);

    return message.channel.send(botembed);
} 
module.exports.help = {
    name: "botinfo"
}