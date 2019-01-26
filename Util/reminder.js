const discord = require("discord.js");
const ms = require('ms');
const randomColor = require('randomcolor');

module.exports.run = async(bot, message, args) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

     //if(message.author.id !== '496091129800818768') return message.channel.send("Still testing phase");
  let timespan = args[0];
  if(!timespan) return message.channel.send("Provide a time span or else I wont know when to send the reminder");
  if(ms(timespan) == undefined) return message.channel.send("Invalid timespan: " +  "``" + timespan + "``");
  if(ms(timespan) > 2073600000) return message.channel.send("The max I can go up to is 24 days")
  let reminder = args.join(' ').slice(args[0].length);
  if(!reminder) return message.channel.send("I cant send an empty message")

  let rEmbed = new discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL)
  .setColor(color)
  .addField("Reminder:", "```" + reminder.slice(1) + "```")
  .addField("Time Set:", "```" + timespan + "```")
  .setTimestamp()
  message.channel.send(rEmbed);

  setTimeout(async function(){
    message.channel.send(`${message.author}, check your DM's`)
    let fEmbed = new discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setColor(color)
    .addField("Reminder:", "```" + reminder.slice(1) + "```")
    .setTimestamp()
    try{
      await message.author.send(fEmbed);
    } catch (e) {
      return message.channel.send(`${message.author.username} has their dm's locked.`);
    }
  }, ms(timespan))

}

module.exports.help = {
  name: "remind"
}
