const discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send("there is no queue");

    let currentQueue = fetched.queue;
    let currentSong = currentQueue[0];

    let resp = '';
    for (var i = 1; i < currentQueue.length; i++){
        resp += `**[${parseInt(i)}]**: ${currentQueue[i].title}\n\n`
    }

    let qEmbed = new discord.RichEmbed()
    .setAuthor("Server Queue", message.guild.iconURL)
    .setColor('8069f4')
    if(currentQueue.length < 2){
        qEmbed.setDescription(`**__Now playing__** \n[${currentSong.title}](${currentSong.url})\n\n**__Queue__**\nTheres only one song in this queue`)
    } else {
        qEmbed.setDescription(`**__Now playing__** \n[${currentSong.title}](${currentSong.url})\n\n**__Queue__**\n${resp}`)
    }
    message.channel.send(qEmbed);
}

module.exports.help = {
    name: "queue"
}