const discord = require("discord.js");

let cooldown = new Set();
let cdseconds = 6;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("only people with ``MANAGE_MESSAGES`` can use this command");
    if(!args[0]) return message.reply("formatted like so: ``-delete (number between 1 and 50)``");
    if(isNaN(args[0])) return message.reply("numbers only pl0x");
    if(args[0] > 50) return message.reply("50 is the max number of messages i can delete at once");
    if(args[0] < 1) return message.reply("try again except put a number greater than or equal to 1");
    //cooldown
    if(cooldown.has(message.channel.id)){
        let cEmbed = new discord.RichEmbed()
        .setDescription("Cooldown!!!")
        .setColor('FF0000')
        .addField("oi slow down", cdseconds + " second cooldown between commands")
        return message.channel.send(cEmbed)
    }
        cooldown.add(message.channel.id);

        setTimeout(() => {
            cooldown.delete(message.channel.id)
        }, cdseconds * 1000);
        //end of cooldown code
    try{
    await message.channel.bulkDelete(parseInt(args[0]) + 1)
        .then(msgs => {
            return message.channel.send(`**${message.author.tag}** deleted **${parseInt(msgs.size) - 1}** messages`);
        })
        .then(msg => msg.delete(5000))
        .catch(err => {
            message.channel.send("something went wrong. either check my perms or staph tryna break me");
            //console.log(err)
        })
} catch (e) {
    console.log(e);
};
}

module.exports.help = {
  name: "delete"
}