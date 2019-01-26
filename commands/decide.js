const discord = require('discord.js');
const randomColor = require('randomcolor');


module.exports.run = async(bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
     });

    let options = args.join(' ');
    let fOptions = options.split(' ').join(',');

    if(!options){
        return message.channel.send("**1) no input provided**\n2) list contains a backtick\n3) more than one space between list items\n4) list starts with a space");
    }
    else if(options.includes("`")){
        return message.channel.send("1) no input provided\n**2) list contains a backtick**\n3) more than one space between list items\n4) list starts with a space");
    }
    else if(options.includes('  ')){
        return message.channel.send("1) no input provided\n2) list contains a backtick\n**3) more than one space between list items**\n4) list starts with a space");
    }
    else if(options.startsWith(' ')){
        return message.channel.send("1) no input provided\n2) list contains a backtick\n3) more than one space between list items\n**4) list starts with a space**");
    }
            

    splitArray = options.split(' '); //returns a comma serperated array

    let decision = splitArray[Math.floor(Math.random() * splitArray.length)]; //randomly chooses from the array
    //console.log(splitArray)

    let dEmbed = new discord.RichEmbed()
    .setAuthor("Decide", bot.user.displayAvatarURL)
    .setColor(color)
    .setDescription(`**Choices:** ` + "``" + fOptions + "``" + "\n**Decision:** " + "``" + decision + "``")

    message.channel.send(dEmbed);

}


module.exports.help = {
    name: "pick"
}