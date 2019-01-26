const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    var localFileAttachment = new discord.Attachment('./pics/radian.png')
    var localFileAttachment2 = new discord.Attachment('./pics/unitcircle.png')
    var localFileAttachment3 = new discord.Attachment('./pics/unitcirclesincos.jpeg')
    var pics = [localFileAttachment, localFileAttachment2, localFileAttachment3];

    valueToUse = pics[Math.floor(Math.random() * pics.length)];
    return message.channel.send(valueToUse);
}
module.exports.help = {
    name: "ucircle"
}