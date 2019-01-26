const discord = require('discord.js');
const randomColor = require('randomcolor');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
     });
    let mCount = message.guild.memberCount - message.guild.members.filter(member => member.user.bot).size //number of real people on the server. Excludes bots
    let sicon = message.guild.iconURL;

    let onlineCount = message.guild.members.filter(m => m.presence.status == 'online').size;
    let dndCount = message.guild.members.filter(m => m.presence.status == 'dnd').size;
    let idleCount = message.guild.members.filter(m => m.presence.status == 'idle').size;
    let streamingCount = message.guild.members.filter(m => m.presence.status == 'streaming').size;
    let offlineCount = message.guild.members.filter(m => m.presence.status == 'offline').size;

    const online = bot.emojis.find(emoji => emoji.name === "online");
    const dnd = bot.emojis.find(emoji => emoji.name === "dnd");
    const idle = bot.emojis.find(emoji => emoji.name === "idle");
    const streaming = bot.emojis.find(emoji => emoji.name === "streaming");
    const offline = bot.emojis.find(emoji => emoji.name === "offline");


    let serverembed = new discord.RichEmbed()
    .setAuthor(`${message.guild.name} - Information`, message.guild.iconURL)
    .setDescription(`[Server Icon](${message.guild.iconURL})`)
    .addField("Created on", moment(message.guild.createdAt).format('llll'), true)
    .addField("You joined on", moment(message.member.joinedAt).format('llll'), true)
    .addField("Verification Level", `${message.guild.verificationLevel} out of 4`)
    .setColor(color)
    .setThumbnail(sicon)
    .addField("Server Stats", `Name: ${message.guild.name} \nOwner: <@${message.guild.ownerID}> \nRegion: ${message.guild.region}`, true)
    .addField(`Channels [${message.guild.channels.filter(c => c.type !== "category").size}]`, `Text channels: ${message.guild.channels.filter(c => c.type === 'text').size} \nVoice channels: ${message.guild.channels.filter(c => c.type === 'voice').size}`, true) //number of roles the server has
    .addField(`Member stats [${mCount} humans, ${message.guild.members.filter(member => member.user.bot).size} bots]`, `${message.guild.memberCount} total members\n${online}${onlineCount} | ${idle}${idleCount} | ${dnd}${dndCount} | ${offline}${offlineCount} | ${streaming}${streamingCount}`)
    .addField(`Server Roles [${message.guild.roles.size}]`, message.guild.roles.map(r => `${r}`).join(' '), true) //states what the roles are
    .setFooter("Requested by " + message.author.tag)
    .setTimestamp();
    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo"
}
