const discord = require('discord.js');
const randomColor = require('randomcolor');

module.exports.run = async(bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
     });

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("mention an actual person in this server");
    if(kUser.id == "501135579476656148") return message.channel.send("Im not gonna kick myself ya dummy")
    if(!message.guild.member(kUser).kickable) return message.channel.send("no perms to kick " + "``" + kUser.user.tag + "``");
    let kReason = args.join(" ").slice(22);
    if(!kReason) kReason = "No reason provided";
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have admin roles");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can not be kicked since they are admin");

    let kembed = new discord.RichEmbed()
    .setAuthor(kUser.user.tag, kUser.user.displayAvatarURL)
    .setDescription("**Are you sure you want to KICK this person?**")
    .setColor(color)
    .setThumbnail('https://cdn.discordapp.com/attachments/518593740433260565/525791784291270668/unknown.png')
    .addField("Reason", kReason)
    .setFooter("Say YES to finalize the kick")
    message.channel.send(kembed);

        const filter = m => m.author.id === message.author.id; //message collector filter
        message.channel.awaitMessages(filter, {max: 1, time: 15000}).then(collected => {
        let response = collected.first().content;

        if(response.toLowerCase() !== "yes"){
            return message.channel.send("Alright, " + "``" + kUser.user.tag + "``" + " gets to live another day on this server");
        }

        try{
            message.guild.member(kUser).kick(kReason); //kicks user
            message.channel.send(kUser + " has been kicked from the server") //says it kicked the user
        } catch (e) {
            return message.channel.send("something went wrong");
        }

    }).catch(err => {
        return message.reply(" Guess no one's gonna get kicked. No response for the past 15 seconds")
    })
}


module.exports.help = {
    name: "kick"
}