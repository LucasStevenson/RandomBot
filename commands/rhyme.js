const discord = require('discord.js');
const rhyme = require('rhyme');
const randomColor = require('randomcolor');

module.exports.run = async (bot, message, args) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

let input = args.join(' ');
if(!input) return message.channel.send("put in something for me to rhyme pls");

rhyme(function (r){
    let rEmbed = new discord.RichEmbed()
    .setDescription(`*Words that rhyme with **${input}***`)
    .setColor(color)
    if(r.rhyme(input).length == 0){
        return message.channel.send(`i cant find anything that rhymes with **${input}**...make sure its a real word or try something else`);
    } else if (r.rhyme(input).length >= 130){
        return message.channel.send("2 many results to fit into this embed");
    } else {
        rEmbed.addField(`There are ${r.rhyme(input).length} results`, `${r.rhyme(input).join(' **|** ')}`)
        message.channel.send(rEmbed);
    }
    })
}

module.exports.help = {
    name: "rhyme"
}