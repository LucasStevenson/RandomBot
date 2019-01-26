const discord = require('discord.js');
const randomColor = require('randomcolor');


module.exports.run = async(bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
     });

    const filter = m => m.author.id === message.author.id;
    message.reply("You got 60 seconds to respond");
    let wEmbed = new discord.RichEmbed()
    .setTitle("Dice Roulette")
    .setColor(color)
    .addField("Warning", "This is a roulette type command, meaning that if mess up you will be kicked from the server (assuming I have perms) \n **Do you still wish to do it?**")
    .setFooter("Say CONTINUE if you want to play. Any other input will count it as no")
    message.channel.send(wEmbed);
    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {

    let input1 = collected.first().content;

    if(input1.toLowerCase() !== "continue"){
        return message.channel.send("itsk if u dont wanna play. maby next tiem");
    } else {
        message.channel.send("```" + "Alright lets begin" + "```");

    message.reply("You got 60 seconds to respond");
    let iEmbed = new discord.RichEmbed()
    .setTitle("How to play")
    .setColor(color)
    .addField("Instructions", "Type in a number between 1 and 6, and let chance decide whether you get kicked")
    .setFooter("Type CANCEL if you want to cancel")
    message.channel.send(iEmbed);
    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {

    let input2 = collected.first().content;

    if(input2.toLowerCase() === "cancel"){
        return message.channel.send("ok. game cancelled");
    }
    roll = Math.floor(Math.random() * 6) + 1

    if(input2 == roll){
        return message.channel.send("Well shit you actually guessed it right. The dice landed on " + roll)
    } else {
        message.channel.send("Rip you got it WRONG. The dice landed on " + roll);
    }

    try{
        if(!message.guild.member(message.author).kickable) return message.reply("I can't kick you due to lack of perms");
        message.guild.member(message.author).kick();
        message.channel.send("Goodbye " + "``" + message.author.tag + "``" + ". Feelsbadman" + " :frowning:");
    } catch(e){
        return message.channel.send("Something went wrong");
    }

    }).catch(err => {
        return message.reply(" 60 seconds have passed without a response...canceled roulette");
    })  
        }
    }).catch(err => {
        return message.reply(" Well its been 60 seconds without a response so I'm assuming thats a no")
    })





}

module.exports.help = {
    name: "diceroulette"
}