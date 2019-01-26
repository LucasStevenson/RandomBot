const discord = require('discord.js');
const yodasay = require('yodasay');

module.exports.run = async(bot, message, args) => {

    let text = args.join(' ');

    if(!text){
        return message.channel.send("```" + yodasay.say({
            text: "Put something for me to say, or else imma keep repeating this message"
        }) + "```") 
    }


    if(text.includes("```")){ 
        return message.channel.send("```" + yodasay.say({
            text: "Stupid you are"
        }) + "```") 

}


    message.channel.send("```" + yodasay.say({
        text : text
    }) + "```") 
}


module.exports.help = {
    name: "yodasay"
}