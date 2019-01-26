const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    //addrole @user role

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have admin roles"); //if user does not have admin perms they can not use the command

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); //the person they are trying to give a role to
    if(!rUser) return message.channel.send("pl0x mention real person"); //if the user doesnt exist or the input didnt even have a person to begin with
    if(rUser.id == "501135579476656148") return message.channel.send("cant gib myself roles") //bot wont give itself role

    let role = args.join(" ").slice(args[0].length).toLowerCase(); //the actual role itself
    if(!role) return message.reply("specify a role to give " + "``" + rUser.user.tag + "``"); //if the input doesnt have a role

    let gRole = message.guild.roles.find(r => r.name.toLowerCase() === role.slice(1)); //finds the input and checks whether it is a real role
    if(!gRole) return message.channel.send("``" + role + "``" + ' is not a real role in this server'); //if the role the input was undefined
    if(rUser.roles.has(gRole.id)) return message.channel.send("how am i supposed to give em a role they already have");

    try{
    await rUser.addRole(gRole.id);
    message.channel.send("✅ Successfully gave " + rUser + " the role " + gRole);
    } catch(e) {
    return message.channel.send("❌ i hav no perms to give " + rUser + " the role " + gRole);
    }
}

module.exports.help = {
    name: 'addrole'
}