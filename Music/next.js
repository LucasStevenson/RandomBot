const discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send("i cant skip a song if nothing is playing");
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("i only obey commands made in the same voice channel as me");

    fetched.dispatcher.end();
}

module.exports.help = {
    name: "next"
}