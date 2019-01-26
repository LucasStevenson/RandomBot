const discord = require('discord.js');
const randomColor = require('randomcolor');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });
     mention = message.mentions.members.first() || message.guild.members.get(args[0]); //if mentioned user

     //status emotes
     const online = bot.emojis.find(emoji => emoji.name === "online");
     const dnd = bot.emojis.find(emoji => emoji.name === "dnd");
     const idle = bot.emojis.find(emoji => emoji.name === "idle");
     const offline = bot.emojis.find(emoji => emoji.name === "offline");
     const streaming = bot.emojis.find(emoji => emoji.name === "streaming");
     
     //dates when author created and joined server
     var userCreated = moment(message.author.createdAt).format('llll');
     var userJoined = moment(message.member.joinedAt).format('llll');
     
     //author status
     let authorStatus = message.member.presence.status;
     
     if(!mention){ //if no one was mentioned
    
        let uEmbed = new discord.RichEmbed()

        uEmbed.setTitle(`Information for ${message.author.username}`)
        switch(authorStatus){
            case "online":
              uEmbed.setDescription(`${online}**Online**`);
              break;
            case "dnd":
              uEmbed.setDescription(`${dnd}**Do Not Disturb**`);
              break;
            case "idle":
              uEmbed.setDescription(`${idle}**Idle**`);
              break;
            case "streaming":
              uEmbed.setDescription(`${streaming}**Streaming**`);
              break;
            default:
              uEmbed.setDescription(`${offline}**Invisible or offline**`);
              break;
          }
        
          uEmbed.addField("Username", `${message.author.tag}`, true)
          uEmbed.setColor(color)
          uEmbed.addField("UserID", `${message.author.id}`, true)
          if(!message.member.nickname){
              uEmbed.addField("Nickname", message.author.username, true)
            } else {
              uEmbed.addField("Nickname", message.member.nickname, true)
            }
          uEmbed.setThumbnail(message.author.displayAvatarURL)
          uEmbed.addField(`Currently playing`, message.author.presence.game ? message.author.presence.game.name: "Nothing", true)
          uEmbed.addField("Roles", message.member.roles.map(r => `${r}`).join(' | '))
          uEmbed.addField("Account created on", userCreated, true)
          uEmbed.addField("Joined server on", userJoined, true)
          message.channel.send(uEmbed);


     } else { //if someone was mentioned

        var memberToUse = message.mentions.members.first();
        let userStats = memberToUse.presence.status;
        var joinDiscord = moment(memberToUse.user.createdAt).format('llll');
        var joinServer = moment(memberToUse.joinedAt).format('llll');

        let userEmbed = new discord.RichEmbed()

        userEmbed.setTitle(`Information for ${memberToUse.user.username}`)
        switch(userStats){
            case "online":
              userEmbed.setDescription(`${online}**Online**`);
              break;
            case "dnd":
              userEmbed.setDescription(`${dnd}**Do Not Disturb**`);
              break;
            case "idle":
              userEmbed.setDescription(`${idle}**Idle**`);
              break;
            case "streaming":
              userEmbed.setDescription(`${streaming}**Streaming**`);
              break;
            default:
              userEmbed.setDescription(`${offline}**Invisible or offline**`);
              break;
          }
      
        userEmbed.addField("Username", `${memberToUse.user.tag}`, true)
        userEmbed.setColor(color)
        userEmbed.addField("UserID", `${memberToUse.id}`, true)
        if(!memberToUse.nickname){
            userEmbed.addField("Nickname", memberToUse.user.username, true)
          } else {
            userEmbed.addField("Nickname", memberToUse.nickname, true)
          }
        userEmbed.setThumbnail(memberToUse.user.displayAvatarURL)
        userEmbed.addField(`Currently playing`, memberToUse.presence.game ? memberToUse.presence.game.name: "Nothing", true)
        userEmbed.addField("Roles", memberToUse.roles.map(r => `${r}`).join(' | '))
        userEmbed.addField("Account created on", joinDiscord, true)
        userEmbed.addField("Joined server on", joinServer, true)
        message.channel.send(userEmbed);
     }
}

module.exports.help = {
    name: "userinfo"
}