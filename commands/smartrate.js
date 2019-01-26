const discord = require('discord.js');
const randomColor = require('randomcolor');

module.exports.run = async (bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
     });

     let chance = Math.floor(Math.random() * 100) + 1

    if(!args[0]){
        var nembed = new discord.RichEmbed()
        .setColor(color)
        .setTitle("smartrate randomizer")
        .setDescription("You are " + chance + "% smart")

        return message.channel.send(nembed);
    } 
    var rembed = new discord.RichEmbed()
    .setColor(color)
    .setTitle("smartrate randomizer")
    .setDescription(args.join(' ') + " is " + chance + "% smart")
    

    return message.channel.send(rembed)

}

module.exports.help = {
    name: "smartrate"
}