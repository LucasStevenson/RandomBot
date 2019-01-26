const discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if(message.author.id == '247979662314045441') return message.channel.send("no more record or get 4 u");
        improvedmessage = message.content.slice(8); //cuts off the status and the space that comes after it when it records the message

        if(!improvedmessage) return message.channel.send("record a msg u fool");

        if(!bot.whosmard[message.author.id]){ //if the user recorded has not recorded a msg yet, the bot will record it
        bot.whosmard[message.author.id] = { //records the message that the person wrote in whosmard.json
            message: improvedmessage //records the cut message in the JSON file
        }
        fs.writeFile("./whosmard.json", JSON.stringify(bot.whosmard, null, 4), err => {
            if(err) throw err;
            message.channel.send("message recorded")
        })
        
        } else { //if the user ALREADY has a message recorded, one req will be checked. otherwise same as b4
        if(improvedmessage == bot.whosmard[message.author.id].message) return message.channel.send("you already have " + "``" + improvedmessage + "``" + " recorded. why wud u wanna record it again?");

        bot.whosmard[message.author.id] = { //records the message that the person wrote in whosmard.json
            message: improvedmessage //records the cut message in the JSON file
        }
        fs.writeFile("./whosmard.json", JSON.stringify(bot.whosmard, null, 4), err => {
            if(err) throw err;
            message.channel.send("message recorded")
        })
        
    }
    }

module.exports.help = {
    name: "record"
}