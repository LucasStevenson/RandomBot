const discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    try{

    if(message.author.id == '247979662314045441') return message.channel.send("no more get or record 4 u");
    let user = message.mentions.members.first(); //user var is whoever is the first pinged person in the message
    var mention = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(mention == null){
        try{ //tries to fetch the last recorded msg by the user
        let aMessage = bot.whosmard[message.author.id].message;
        return message.channel.send("last message recorded by " + message.author + " was --" + aMessage);
        } catch(e){ //if the user nvr recorded a msg
            return message.channel.send("u nvr recorded a msg"); //yey no errors
        }
    }

    let _message = bot.whosmard[mention.id].message; //looks for the last message the person that got pinged sent
    let userN = user.toString(); //puts the author ID into their username

    message.channel.send("last message recorded by " + userN + " was --" + _message); //sends that message
    } catch(e){
        return message.channel.send("``" + mention.user.tag + "``" + " has not recorded a message")
    }

    };

module.exports.help = {
    name: "get"
}