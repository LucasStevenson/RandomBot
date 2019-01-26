const discord = require('discord.js');
const randomColor = require('randomcolor');
const math = require('mathjs');

module.exports.run = async (bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    if(!args[0]) return message.channel.send("Alright you dummy, put in values first");
    let resp;
    try{
        resp = math.eval(args.join(' '));

    } catch (e) {
        return message.channel.send("das 2 hard 4 meh. try an easier one")
    }

    const membed = new discord.RichEmbed()
    .setColor(color)
    .setTitle("Calculator")
    .addField("```" + "question" + "```", "```" + args.join(' ') + "```", true)
    .addField("```" + "answer" + "```", "```" + resp + "```", true)
    .addField("FYI", "sin/cos in degrees is formatted like this: **sin(90 deg)**")
    .setThumbnail("https://is4-ssl.mzstatic.com/image/thumb/Purple62/v4/d3/a3/7c/d3a37cfc-7c3f-696f-68d9-f7de9912e8c5/source/512x512bb.jpg")
    .setFooter("By default, this calculator is in radians");

    return message.channel.send(membed)

}

module.exports.help = {
    name: "calc"
}