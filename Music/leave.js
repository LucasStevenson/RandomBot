const discord = require('discord.js');


module.exports.run = async (bot, message, args, ops) => {

    if(!message.member.voiceChannel) return message.channel.send("Get in a voice call first");

    if(!message.guild.me.voiceChannel) return message.channel.send("i'm not even connected to a voice channel");

    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("You arent connected to the same channel");

    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send("theres nothing playing");

    fetched.queue = [];
    fetched.dispatcher.end();

    message.channel.send("Disconnected");
}

module.exports.help = {
    name: "begone"
}