const discord = require('discord.js');
const cowsay = require('cowsay');

module.exports.run = async(bot, message, args) => {

    let text = args.join(' ');

    if(!text) {
        return message.channel.send("```" + cowsay.say({
            text : "Put something for me to say other than this lame message"
        }) + "```") 
    }


    if(text.includes("```")){
        message.channel.send("```" + cowsay.say({
            text : "No just stop"
        }) + "```") 
    } else {
    message.channel.send("```" + cowsay.say({
        text : text
    }) + "```") 
}
}

module.exports.help = {
    name: "cowsay"
}