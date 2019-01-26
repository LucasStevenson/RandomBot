const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {


    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You dont have permission to talk through the bot mate"); //if message.author does not have perms to kick members
    let botmessage = args.join(" "); //message.author input
    if(!botmessage) return message.reply("Ya needa put something for me to say...")
    if(!message.deletable){
        function EveryOtherLetter (x) {
            var res = "";
            for (i=0; i < x.length; i++) {
               res += i % 2 == 0 ? x.charAt(i).toUpperCase() : x.charAt(i);
            }
            return res;  
          }
          
          message.channel.send((EveryOtherLetter(botmessage)));
    } else {
        message.delete(); //deletes the og message
        function EveryOtherLetter (x) {
            var res = "";
            for (i=0; i < x.length; i++) {
               res += i % 2 == 0 ? x.charAt(i).toUpperCase() : x.charAt(i);
            }
            return res;  
          }
          
          message.channel.send((EveryOtherLetter(botmessage)));
    }
}

module.exports.help = {
    name: "say"
}