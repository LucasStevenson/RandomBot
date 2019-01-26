const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    //removerole @user role

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("only **admins** can use this command"); //if user does not have admin perms they can not use the command

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); //the person they are trying to give a role to
    if(!rUser) return message.channel.send("format like dis: ``-removerole @user role``"); //if the user doesnt exist or the input didnt even have a person to begin with
    if(rUser.id == "501135579476656148") return message.channel.send("i cant remove roles from myself") //bot wont give itself role

    let role = args.join(" ").slice(args[0].length).toLowerCase(); //the actual role itself
    if(!role) return message.reply("be sure to specify a role to remove from " + "``" + rUser.user.tag + "``"); //if the input doesnt have a role

    let gRole = message.guild.roles.find(r => r.name.toLowerCase() === role.slice(1)); //finds the input and checks whether it is a real role
    if(!gRole) return message.channel.send("``" + role + "``" + ' is not a real role in this server'); //if the role the input was undefined
    if(gRole == `@everyone`) return message.channel.send("❌ i cant remove the everyone role"); //cant remove @everyone role
    if(!rUser.roles.has(gRole.id)) return message.channel.send("i cant remove " + gRole + " from " + "``" + rUser.user.tag + "``" + " because they dont have that role");
    if(rUser.id == message.author.id && gRole == rUser.highestRole) return message.reply("why would you want to loose your highest role?? i refuse to take that away from you");

    try{
        await rUser.removeRole(gRole.id);
        message.channel.send("✅ Successfully removed the role " + gRole + " from " + rUser);
    } catch(e) {
        return message.channel.send("❌ i hav no perms remove the role " + gRole + " from " + rUser);
    }
}

module.exports.help = {
    name: 'removerole'
}