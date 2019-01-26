const discord = require('discord.js'); //imports the discord.js library to this variable (discord)
const botconfig = require("./botconfig.json");
const fs = require("fs"); //fs stands for the node filesystem
const bot = new discord.Client({disableEveryone: true}); //this line is saying that the bot cant mention @everyone or @here
bot.commands = new discord.Collection();
const active = new Map();

bot.whosmard = require("./whosmard.json");

fs.readdir("./commands/", (err, files) => { //the => is pretty much the same thing as putting function()...its just a shortcut really
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f, i) => { //this is for the command handler
        let props = require('./commands/' + f); //props is pretty much the name of each individual file
        //console.log(f + ' loaded!'); //logs that all the files have loaded on startup
        bot.commands.set(props.help.name, props);
    });
    console.log("Commands loaded!");
});


fs.readdir("./Admin/", (err, files) => { //the => is pretty much the same thing as putting function()...its just a shortcut really
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f, i) => { //this is for the command handler
        let props = require('./Admin/' + f); //props is pretty much the name of each individual file
        //console.log(f + ' loaded!'); //logs that all the files have loaded on startup
        bot.commands.set(props.help.name, props);
    });
    console.log("Admin loaded!");
});


fs.readdir("./Info/", (err, files) => { //the => is pretty much the same thing as putting function()...its just a shortcut really
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f, i) => { //this is for the command handler
        let props = require('./Info/' + f); //props is pretty much the name of each individual file
        //console.log(f + ' loaded!'); //logs that all the files have loaded on startup
        bot.commands.set(props.help.name, props);
    });
    console.log("Info loaded!");
});


fs.readdir("./Math/", (err, files) => { //the => is pretty much the same thing as putting function()...its just a shortcut really
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f, i) => { //this is for the command handler
        let props = require('./Math/' + f); //props is pretty much the name of each individual file
        //console.log(f + ' loaded!'); //logs that all the files have loaded on startup
        bot.commands.set(props.help.name, props);
    });
    console.log("Math loaded!");
});


fs.readdir("./Music/", (err, files) => { //the => is pretty much the same thing as putting function()...its just a shortcut really
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f, i) => { //this is for the command handler
        let props = require('./Music/' + f); //props is pretty much the name of each individual file
        //console.log(f + ' loaded!'); //logs that all the files have loaded on startup
        bot.commands.set(props.help.name, props);
    });
    console.log("Music loaded!");
});


fs.readdir("./Say/", (err, files) => { //the => is pretty much the same thing as putting function()...its just a shortcut really
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f, i) => { //this is for the command handler
        let props = require('./Say/' + f); //props is pretty much the name of each individual file
        //console.log(f + ' loaded!'); //logs that all the files have loaded on startup
        bot.commands.set(props.help.name, props);
    });
    console.log("Say loaded!");
});


fs.readdir("./Util/", (err, files) => { //the => is pretty much the same thing as putting function()...its just a shortcut really
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f, i) => { //this is for the command handler
        let props = require('./Util/' + f); //props is pretty much the name of each individual file
        //console.log(f + ' loaded!'); //logs that all the files have loaded on startup
        bot.commands.set(props.help.name, props);
    });
    console.log("Util loaded!");
});



bot.on("ready", async () => { //whenever the ready event is active, everything inside this window also goes off
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("Preifx is [ - ] (minus key)", {type: "Playing"});
    bot.user.setStatus('online');
});

bot.on("message", async message => {
    if(message.author.bot) return; //bot will not answer to itself
    if(message.channel.type === "dm") return; //this line says that a user can no use bot commands through dm's
    if(message.author.id !== '496091129800818768' && !message.content.startsWith(botconfig.prefix)) return;

    let prefix = botconfig.prefix; //prefix
    let messageArray = message.content.split(" "); //splits per every space
    let cmd = messageArray[0].toLowerCase(); //the actual command itself. first index in the array
    let msg = message.content.toLowerCase();
    let args = messageArray.slice(1); //everything other than the cmd

    let ops = {
        active: active
    }

    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot,message,args,ops);

    //if(msg.includes('')) {
       // message.delete();
       //message.channel.send("No saying that")
    //}
    
    //if(msg.includes('')) {
        //var pic = new discord.Attachment('./memes/peters.png')
       // message.channel.send(pic)
    //}
    
});

bot.login(botconfig.token);