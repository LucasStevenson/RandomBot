const discord = require('discord.js');
const randomColor = require('randomcolor');

let cooldown = new Set();
let cdseconds = 3;


module.exports.run = async(bot, message, args) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

     //cooldown
    if(cooldown.has(message.author.id)){
    let cEmbed = new discord.RichEmbed()
    .setDescription("Cooldown!!!")
    .setColor(color)
    .addField("oi slow down", "3 second cooldown between commands")
    return message.channel.send(cEmbed)
}
    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)
    //end of cooldown code

    //defining vars
    flip = ["heads", "tails"]
    flipresult = flip[Math.floor(Math.random() * flip.length)];
    message.channel.send("Flipping coin...").then(d_msg => { d_msg.delete(1750)});
    //end of defining vars


    //guessing heads or tails check
    if(!args[0]) { //if user does not put either heads or tails, the bot will just respond with which side the coin landed on
        await message.channel.awaitMessages(message => message.content.startsWith(), {time: 2000});
        return message.channel.send("You flipped a coin and it landed on " + "``" + flipresult + "``");
    }

    if(args[0].toLowerCase() !== flipresult) { //if the user guesses the side it will land on correctly, the bot will respond accordingly
        await message.channel.awaitMessages(message => message.content.startsWith(), {time: 2000});
        return message.channel.send("The coin landed on " + "``" + flipresult + "``" + " which means that u succ")
} else{
    await message.channel.awaitMessages(message => message.content.startsWith(), {time: 2000});
    return message.channel.send("ayyy u got it right...The coin landed on " + "``" + flipresult + "``")
}
//end
}

module.exports.help = {
    name: "flipcoin"
}