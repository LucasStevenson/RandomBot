const discord = require('discord.js');
const randomColor = require('randomcolor');
const got = require('got');

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


    let subreddits = ['dankmemes', 'memeeconomy'];
    got(`https://www.reddit.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/random/.json?sort=top&t=day&limit=500`)
        .then(response => {
            let content = JSON.parse(response.body);
            var image = content[0].data.children.filter(post => post.data.preview);
            var pic = image[0].data.url;
            let mEmbed = new discord.RichEmbed()
                .setTitle(content[0].data.children[0].data.title)
                .setURL("https://www.reddit.com" + content[0].data.children[0].data.permalink)
                .setColor(color)
                .setImage(pic)
                .setFooter("/r/" + content[0].data.children[0].data.subreddit)
            return message.channel.send(mEmbed);
    
    }).catch(e => {
        message.channel.send("something went wrong. too many requests?");
        console.error(e);
});

}

module.exports.help = {
    name: "meme"
}