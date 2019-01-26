const discord = require('discord.js');
const urban = require('relevant-urban');
const randomColor = require('randomcolor');

module.exports.run = async (bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    if(!args[0]) return message.channel.send("missing search input"); //!urban without the input

    let res =  await urban(args.join(' ')).catch(e => { //result. ud will try find args.join(' '). catch potential errors
        return message.channel.send("Cant find the word " + "``" + args.join(' ') + "``"); //if the input is not in the urban dictionary
    });

    var uEmbed = new discord.RichEmbed()
    .setTitle(res.word)
    .setColor(color)
    .setURL(res.urbanURL) //sets the title name to the urbandictionary URL
    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`) //definition
    .addField("Author", `**\`${res.author}\`**`, true) //who made the definition
    .addField(`Upvotes / Downvotes`, `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`, true) //upvotes | downvotes

    if(res.word == undefined) return; //wont give error

    if(res.tags.length > 0 && res.tags.join(', ').length < 1024) { //basically if there are tags that arent too long
        uEmbed.addField('Tags', res.tags.join(', '), true) //tags to the word input and makes a field
    }
    message.channel.send(uEmbed)
}

module.exports.help = {
    name: "urban"
}