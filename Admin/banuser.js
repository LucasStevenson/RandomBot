const discord = require('discord.js');
const randomColor = require('randomcolor');

module.exports.run = async(bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("mention an actual person in this server");
    if(bUser.id == "501135579476656148") return message.channel.send("Im not gonna ban myself ya dummy");
    if(!message.guild.member(bUser).bannable) return message.channel.send("no perms to ban " + "``" + bUser.user.tag + "``");
    let bReason = args.join(" ").slice(22);
    if(!bReason) bReason = "No reason provided";
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have admin roles");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can not be banned since they are admin");

    let bembed = new discord.RichEmbed()
    .setAuthor(bUser.user.tag, bUser.user.displayAvatarURL)
    .setDescription("**Are you sure you want to BAN this person?**")
    .setColor(color)
    .setThumbnail("https://cdn.discordapp.com/attachments/501229927996063745/513594391563206656/unknown.png")
    .addField("Reason", bReason)
    .setFooter("Say YES to finalize the ban");
    message.channel.send(bembed);

    const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 15000}).then(collected => {
        let response = collected.first().content;

        if(response.toLowerCase() !== "yes"){
            return message.channel.send("Alright, " + "``" + bUser.user.tag + "``" + " gets to live another day on this server");
        }
        try{
            message.guild.member(bUser).ban(bReason);
            message.channel.send(bUser + " has been banned from the server")
        } catch (e){
            return message.channel.send("something went wrong");
        }

    }).catch(err => {
        return message.reply(" Guess no one's gonna get banned. No response for the past 15 seconds")
    })
}


module.exports.help = {
    name: "ban"
}