const discord = require('discord.js');
const randomColor = require('randomcolor');


module.exports.run = async (bot, message, args) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
     });

     if(!args[0]){
    const filter = m => m.author.id === message.author.id; //makes sure that the first input is coming from the author and not some random person
    message.reply("Put in any word(s) or number in the next 60 seconds"); //sends instrution message
    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => { //it will only read first message sent after the og message
    var input = collected.first().content; //input
    var backward = input.split("").reverse().join(""); //reversed output


    let rEmbed = new discord.RichEmbed() //this is for if they only say reverse with no args attached
    .setDescription("Stuff backwards")
    .setColor(color)
    .addField(message.author.username + " picked the word/phrase/number:", "```" + input + "```")
    .addField("'" + input + "`" + " backwards is:", "```" + backward + "```")
    .setFooter("Just keep in mind theres a difference between reverse and flip")
    .setThumbnail("https://cdn.discordapp.com/attachments/501229927996063745/511025359228108821/unknown.png")
    return message.channel.send(rEmbed);
    }).catch(err => { //if after 60 seconds the user doesnt type in an input, bot sends message
        return message.channel.send("oof 1 minute is up")
    })
} else {
    //defining vars
    let backwar = args.join(" ");
    let revers = backwar.split("").reverse().join("");

    //creating embed
    let aEmbed = new discord.RichEmbed() //if they said reverse with args attached
    .setDescription("Stuff backwards")
    .setColor(color)
    .addField(message.author.username + " picked the word/phrase/number:", "```" + backwar + "```")
    .addField("'" + backwar + "`" + " backwards is:", "```" + revers + "```")
    .setFooter("Just keep in mind theres a difference between reverse and flip")
    .setThumbnail("https://cdn.discordapp.com/attachments/501229927996063745/511025359228108821/unknown.png")
    return message.channel.send(aEmbed);
}
    
}

//input.split("").reverse().join("")

module.exports.help = {
    name: "reverse"
}