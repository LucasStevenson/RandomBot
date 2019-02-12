const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== '496091129800818768') return message.channel.send("Only" + " `Tal#6551` " + "can use this command");

  let codein = args.join(" ");
  if(!codein) return message.reply("ya forgot to add some code for me to evaluate...try again ❌");

  if(codein.startsWith("```") && codein.endsWith("```")){
  codein = codein.slice(3);
  codein = codein.slice(0, -3);
}

   try {
      let code = eval(codein);
      let whatItIs = typeof code;

      if(typeof code !== "string")
      code = require("util").inspect(code, { depth: 0 });

      let embed = new discord.RichEmbed()
      .setAuthor('JavaScript Evaluate')
      .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
      .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
      if(code == "undefined"){
        embed.setColor('FFA500')
      } else {
        embed.setColor('00FF00')
        embed.addField(':dvd: Type', `\`\`\`${whatItIs}\n\`\`\``)
      }
      return message.channel.send(embed)
  } catch(e) {
      let eembed = new discord.RichEmbed()
      .setAuthor('JavaScript Evaluate')
      .setColor('FF0000')
      .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
      .addField(':outbox_tray: Output', `\`\`\`js\n${e}\n\`\`\``)
      return message.channel.send(eembed)
  }
};

module.exports.help = {
  name: "eval"
}
