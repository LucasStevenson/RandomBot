const discord = require('discord.js');
const htmlColors = require("html-colors");
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {

  let uColor = args[0];
  if(!uColor){
    let rColor = htmlColors.random()
    let rEmbed = new discord.RichEmbed()
    .setDescription("Random hex codes")
    .addField(rColor + "'s hex code is", htmlColors.hex(rColor))
    .setColor(htmlColors.hex(rColor))
    return message.channel.send(rEmbed);
  } else {
    let cEmbed = new discord.RichEmbed()
    .setDescription("Hex color codes")
    .addField(uColor + "'s hex code is", htmlColors.hex(uColor))
    .setColor(htmlColors.hex(uColor))
    .setFooter(`Say ${botconfig.prefix}hex for a random hex color`)
    if(htmlColors.hex(uColor) == undefined) return message.channel.send("Cannot find " + "``" + uColor + "``" + "'s hex code \nMake sure the color is one word (ex. light blue is lightblue)")
    return message.channel.send(cEmbed);
}
}

module.exports.help = {
    name: "hex"
}
