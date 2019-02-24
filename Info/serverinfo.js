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
    let streamingCount = message.guild.members.filter(m => m.presence.status == 'Streaming').size;
    let offlineCount = message.guild.members.filter(m => m.presence.status == 'offline').size;

    const online = bot.emojis.find(emoji => emoji.name === "online");
    const dnd = bot.emojis.find(emoji => emoji.name === "dnd");
    const idle = bot.emojis.find(emoji => emoji.name === "idle");
    const streaming = bot.emojis.find(emoji => emoji.name === "streaming");
    const offline = bot.emojis.find(emoji => emoji.name === "offline");

    const capitalize = (s) => {
        if (typeof s !== 'string' || s.includes(" ")) return s;
        return s[0].toUpperCase() + s.slice(1);
    };


    let serverembed = new discord.RichEmbed()
    serverembed.setAuthor(`${capitalize(message.guild.name)} - Information`, message.guild.iconURL)
    if(message.guild.iconURL == null){
        serverembed.setDescription(`No server icon!`)
    } else {
        serverembed.setDescription(`[Server Icon](${message.guild.iconURL})`)
    }
    serverembed.addField("Created on", moment(message.guild.createdAt).format('llll'), true)
    serverembed.addField("You joined on", moment(message.member.joinedAt).format('llll'), true)
    serverembed.addField("Verification Level", `${message.guild.verificationLevel} out of 4`)
    serverembed.setColor(color)
    serverembed.setThumbnail(sicon)
    serverembed.addField("Server Stats", `Name: ${message.guild.name} \nOwner: <@${message.guild.ownerID}> \nRegion: ${message.guild.region}`, true)
    serverembed.addField(`Channels [${message.guild.channels.filter(c => c.type !== "category").size}]`, `Text channels: ${message.guild.channels.filter(c => c.type === 'text').size} \nVoice channels: ${message.guild.channels.filter(c => c.type === 'voice').size}`, true) //number of roles the server has
    serverembed.addField(`Member stats [${mCount} humans, ${message.guild.members.filter(member => member.user.bot).size} bots]`, `${message.guild.memberCount} total members\n${online}${onlineCount} | ${idle}${idleCount} | ${dnd}${dndCount} | ${offline}${offlineCount} | ${streaming}${streamingCount}`)
    serverembed.addField(`Server Roles [${message.guild.roles.size}]`, message.guild.roles.map(r => `${r}`).join(' '), true) //states what the roles are
    serverembed.setFooter("Requested by " + message.author.tag)
    .setTimestamp();
    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo"
}
