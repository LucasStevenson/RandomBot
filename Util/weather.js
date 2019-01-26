const discord = require('discord.js');
const weather = require('weather-js');
const randomColor = require('randomcolor');

module.exports.run = async(bot, message, args) => {

    var color = randomColor();
    randomColor({
        luminosity: 'random',
        hue: 'random'
    });

    weather.find({search: args.join(" "), degreeType: "F"}, function(err, result) {
        if(err) message.channel.send(err);

        if(!result) return; //wont give error if user does now put a place (!weather)
        if(result[0] == undefined) return message.channel.send("Can't find location"); //if the place user puts is not a real place. invalid

        var current = result[0].current;
        var location = result[0].location;

        let wEmbed = new  discord.RichEmbed()
        .setDescription(`Sky: **${current.skytext}**`) //tells how the sky looks
        .setAuthor(`Current weather for ${current.observationpoint}`) //repeats input
        .setThumbnail(current.imageUrl) //thumbnail depends on what the skytext is
        .setColor(color)
        .addField(`Temperature`, `${current.temperature} Degrees`, true)
        .addField(`Degree Type`, location.degreetype, true)
        .addField(`Wind`, current.winddisplay, true)
        .addField(`Humidity`, `${current.humidity}%`, true)
        .addField(`Standard time`, `UTC${location.timezone}`, true)
        .addField("Current Day", current.day, true)
        return message.channel.send(wEmbed);

    })


}

module.exports.help = {
    name: 'weather'
}