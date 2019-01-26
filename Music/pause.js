const discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send("theres nothing playing");

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("i only obey commands made in the same voice channel as me");

    if(fetched.dispatcher.paused) return message.channel.send("the music is already paused my guy");

    fetched.dispatcher.pause();

    message.channel.send(`paused`);
}

module.exports.help = {
    name: "pause"
}