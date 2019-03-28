const discord = require('discord.js');
const randomColor = require("randomcolor");
const cmds = require("../cmds.json");
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    let mods = '';
    for (let i in cmds.admin.sort()){
        mods += cmds.admin[i] + "\n";
    };

    let information = '';
    for (let i in cmds.info.sort()){
        information += cmds.info[i] + "\n";
    };

    let math = '';
    for (let i in cmds.math.sort()){
        math += cmds.math[i] + "\n";
    };

    let say = '';
    for (let i in cmds.say.sort()){
        say += cmds.say[i] + "\n";
    }

    let util = '';
    for (let i in cmds.util.sort()){
        util += cmds.util[i] + "\n";
    }

    let music = '';
    for (let i in cmds.music.sort()){
        music += cmds.music[i] + "\n";
    }

    let helpembed = new discord.RichEmbed()
    .setTitle(`${bot.user.username} Invite Link`)
    .setURL('https://discordapp.com/api/oauth2/authorize?client_id=501135579476656148&permissions=8&scope=bot')
    .setColor(color)
    .setThumbnail("https://cdn.discordapp.com/attachments/518593740433260565/530495328106053652/thinking_cropped.png")
    .addField(`__Admin Commands__ (${cmds.admin.length})`, mods + "\n==============================================", true)
    .addField(`__Say Commands__ (${cmds.say.length})`, say, true)
    .addField(`__Info Commands__ (${cmds.info.length})`, information, true)
    .addField(`__Math Commands__ (${cmds.math.length})`, math, true)
    .addField(`__Music Commands__ (${cmds.music.length})`, music, true)
    .addField(`__Utilities__ (${cmds.util.length})`, util + "\n==============================================", true)
    .addField(`__Other Commands__ (${cmds.other.length})`, cmds.other.sort().join(', '))
    .setFooter("Requested by " + message.author.tag)
    .setTimestamp()
    try{
        await message.channel.send(helpembed);
    } catch (e) {
        return;
    }

}

module.exports.help = {
    name: "help"
}
