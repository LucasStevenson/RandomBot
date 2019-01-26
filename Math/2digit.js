const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    var number = Math.floor (Math.random() * 20 + 10);
    var numero = Math.floor (Math.random() * 20 + 10);
    var answer = number * numero;

    const filter = m => m.author.id === message.author.id;
    message.reply("You got 5 seconds to answer " + "``" + number + "``" + " times " + "``" + numero + "``");
    message.channel.awaitMessages(filter, {max: 1, time: 5000}).then(collected => {
        if(collected.first().content.toLowerCase() === "idk"){
            return message.channel.send("Ok at least you accept ur bad at math");
        }
        var userA = collected.first().content

        
        if(userA == answer){
            return message.channel.send("good job u got it right");
        } else {
            return message.reply(" Rip u got it wrong...The correct answer was " + "``" + answer + "``");
        }
    }).catch(err => {
        return message.reply(" oof 5 seconds are up...the answer was " + "``" + answer + "``")
    })
   
    }
module.exports.help = {
    name: "2digit"
}