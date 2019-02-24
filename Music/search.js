const discord = require('discord.js');
const search = require('yt-search');
const randomColor = require('randomcolor');

let channels = [];


module.exports.run = async(bot, message, args, ops) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    if(!message.member.voiceChannel) return message.channel.send("Get in a voice call before summoning me"); //user tries playing music when they arent in vc
    //if(message.guild.me.voiceChannel) return message.channel.send("Sorry the bot is already connected"); //bot is already playing music

    const permissions = message.member.voiceChannel.permissionsFor(bot.user); //bot perms
    if(!permissions.has('CONNECT')) return message.channel.send("i cant connect to your voice channel"); //bot has no perms to connect to vc
    if(!permissions.has('SPEAK')) return message.channel.send("what the hecc man, i hab no perms to speak in this call"); //bot has no perms to talk in vc

    if(channels.includes(message.channel.id)) return message.channel.send("theres already an active search in this channel");

    search(args.join(" "), function(err, res){
        if(err) return message.channel.send("put in an input pl0x"); //no input
        channels.push(message.channel.id);
        //console.log(channels);

        let videos = res.videos.slice(0,10); //only gets the first 10 results at most

        let resp = ''; //empty string as if rn
        for (var i in videos) { //checks how many available results there are for the input
            resp += `**[${parseInt(i)+1}]**: \`${videos[i].title} (${videos[i].timestamp})\`\n`;
        };

        //resp += "\n Choose a number between 1 - " + videos.length; //videos.length is how many results there were
        if(videos.length < 1) return message.channel.send("Cant find any songs that match " + "``" + args.join(' ') + "``"); //if no results were found

        let mEmbed = new discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`*Choose a number between 1 - ${videos.length}*`)
        .addField("__Song selection__", `${resp}`)
        .setFooter("Say CANCEL to cancel this youtube search")
        .setColor(color)
        message.channel.send(mEmbed);

        const filter = m => m.author.id === message.author.id && m.content <= videos.length && m.content > 0 || m.content.toLowerCase() == "cancel"; //message filter
        const collector = message.channel.createMessageCollector(filter, {time: 60000}); //message collector with the filter conditions

        collector.videos = videos;

        collector.once('collect', function(m) { //plays song
            if(m.content.toLowerCase() == 'cancel'){
                for (var i = 0; i < channels.length; i++){ 
                    if (channels[i] === message.channel.id) {
                      channels.splice(i, 1); 
                    };
                 };
                //console.log(channels);
                return message.channel.send("cancelled youtube search"); //when the user types 11, the searchis cancelled
            };
            let commandFile = require('./play.js');
            commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], ops);
            for (var i = 0; i < channels.length; i++){ 
                if (channels[i] === message.channel.id) {
                  channels.splice(i, 1); 
                };
             };
            //console.log(channels);
            return;
        });

        collector.once('end', m => { //once 60 second time period has passed
            if(m.size < 1){ //if there was no response
                for (var i = 0; i < channels.length; i++){ 
                    if (channels[i] === message.channel.id) {
                      channels.splice(i, 1); 
                    };
                 };
                //console.log(channels);
                return message.reply("there was no response in the last 60 seconds. cancelling yt search"); //alerts user that their search was cancelled
            };
        });
    });


    
}

module.exports.help = {
    name: "search"
}