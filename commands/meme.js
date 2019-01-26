const discord = require('discord.js');
const randomColor = require('randomcolor');
const meme = require('memejs');

let cooldown = new Set();
let cdseconds = 3;

module.exports.run = async (bot, message, args) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
     });

     //cooldown
    if(cooldown.has(message.author.id)){
        let cEmbed = new discord.RichEmbed()
        .setDescription("Cooldown!!!")
        .setColor('FF0000')
        .addField("oi slow down", cdseconds + " second cooldown between commands")
        return message.channel.send(cEmbed)
    }
        cooldown.add(message.author.id);
    
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, cdseconds * 1000)
        //end of cooldown code

        meme('dankmemes', function(mUrl){
            let mEmbed = new discord.RichEmbed()
            .setTitle(mUrl.title[0])
            .setColor(color)
            .setURL(mUrl.url[0])
            .setImage(mUrl.url[0])
            .setTimestamp()

            try{
                return message.channel.send({embed: mEmbed});
            } catch(e){
                return message.channel.send("Something went wrong");
            }
          })
    

}

module.exports.help = {
    name: "meme"
}