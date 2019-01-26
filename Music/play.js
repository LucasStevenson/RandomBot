const discord = require('discord.js');
const ytdl = require('ytdl-core');
const search = require('yt-search');

module.exports.run = async(bot, message, args, ops) => {

    if(!message.member.voiceChannel) return message.channel.send("Get in a voice call before summoning me"); //if user is not a vc and tries to use the cmd

    const permissions = message.member.voiceChannel.permissionsFor(bot.user); //checks bot perms
    if(!permissions.has('CONNECT')) return message.channel.send("i cant connect to your voice channel");
    if(!permissions.has('SPEAK')) return message.channel.send("oioi i 0 have perms to talk in this call");

    if(!args[0]) return message.channel.send("Put in an input"); //no input

    let validate = await ytdl.validateURL(args[0]); //checks if link is a real playable link

    if(!validate){ //if no link is put in
        search(args.join(" "), function(err, res){ //searches the args join
            let commandFile = require('./play.js'); //uses play
            let videos = res.videos.slice(0,10); //only gets first 10 results
            if(!videos[0]) return message.channel.send("i cant find dat song");
            if(videos[0].timestamp == 0){
                commandFile.run(bot, message, [videos[1].url], ops);
            } else {
                commandFile.run(bot, message, [videos[0].url], ops); //plays the first result
            }
    })
    return; //returns
    }

    let info = await ytdl.getInfo(args[0]);
    let data = ops.active.get(message.guild.id) || {}; //creating a new map for a specific guild

    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("i only obey commands made in the same voice channel as me");
    if(!data.queue) data.queue = []; //if theres no queue, it creates an empty array
    data.guildID = message.guild.id; //guild id diff for every server

    data.queue.push({ //parameters of the video that will be pushed
        title: info.title, //name of the song
        requester: message.author.tag, //who requested it
        url: info.video_url, //the url to the video
        announceChannel: message.channel.id //the channel it was sent in
    });

    if(!data.dispatcher) playStream(bot, ops, data);
    else {
        message.channel.send(`:notes: Added: **${info.title}** to the queue`);
    }

    ops.active.set(message.guild.id, data); //set these parameters in the map

    async function playStream(bot, ops, data){
        bot.channels.get(data.queue[0].announceChannel).send(`:notes: Now playing: **${data.queue[0].title}** :notes:`);

        data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' })); //plays the video url, but the filter makes sure its only audio
        data.dispatcher.guildID = data.guildID;

        data.dispatcher.once('end', function(){ //once a song ends
            finish(bot, ops, this);
        })
    }

    function finish(bot, ops, dispatcher) {
        let fetched = ops.active.get(dispatcher.guildID);

        fetched.queue.shift(); //gets rid fo the song that just ended

        if(fetched.queue.length > 0){ //if theres an ACTUAl queue and theres songs after the one that just ended
            ops.active.set(dispatcher.guildID, fetched);

            playStream(bot, ops, fetched); //play next song
        } else { //if the song that ended was the last song or theres nothing after it
            ops.active.delete(dispatcher.guildID); //get rid of the queue
            message.guild.me.voiceChannel.leave(); //leave the vc
        }
    }
    
}

module.exports.help = {
    name: "play"
}