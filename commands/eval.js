const Discord = require('discord.js');
const post = require('node-fetch');
const config = require('../config.json');
let creators = ["725968708358373477", "419019136547684363", "529493423556919296", "544676649510371328"];

module.exports.run = async (bot, message, args) => {
    if(!creators.includes(message.author.id)) return message.channel.send('You can not open this Legendary Scroll !');

    const embed = new Discord.MessageEmbed()
    .addField(":inbox_tray: Input", `\`\`\`js\n${args.join(" ")}\`\`\``);
    
    try {
      let args = message.content.split(" ").slice(1);
      const code = args.join(" ");
      if (!code) return message.channel.send("Please include the code.");
      let evaled;
      
      // This method is to prevent someone that you trust, open the secret shit here.
      if (["token", "secret", "process.env"].some(s => code.toLowerCase().includes(s))) {
        evaled = "No, i refuse showing my secret stuff";
      } else {
        evaled = eval(code);
      }
      
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      
      let output = clean(evaled);
      if (output.length > 1024) {
        // If the output was more than 1024 characters, we're gonna export them into the hastebin.
       
        let { body } = await post("https://hastebin.com/documents").send(output);
        if(body.key){
        embed.addField(":outbox_tray: Output", `https://hastebin.com/${body.key}.js`)
        embed.setColor("GREEN")
        } else {
          embed.addField(":outbox_tray: Output", `\`\`\`js\n${output.slice(0, 1024)}\`\`\``)
          embed.setColor("GREEN")
        }
        // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
      } else {
        embed.addField(":outbox_tray: Output", `\`\`\`js\n${output}\`\`\``)
        embed.setColor("GREEN")
      }
      
      return message.channel.send(embed);
      
    } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        // Do the same like above if the error output was more than 1024 characters.
        let { body } = await post("https://hastebin.com/documents").send(err);
        if(body.key){
        embed.addField(":outbox_tray: Output", `https://hastebin.com/${body.key}.js`)
        embed.setColor("RED");
        } else {
          embed.addField(":outbox_tray: Output", `\`\`\`js\n${err.slice(0, 1024)}\`\`\``)
          embed.setColor("RED")
        }
      } else {
        embed.addField(":outbox_tray: Output", `\`\`\`js\n${err}\`\`\``)
        embed.setColor("RED");
      }
      
      return message.channel.send(embed);
    }
}

module.exports.config = {
    name: 'eval',
    description: 'Only Owners Can Do This',
    usage: `${config.prefix}eval (code)`,
    accessableby: `Owners`,
    aliases: ['code']
}

function clean(string) {
    if (typeof text === "string") {
      return string.replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
      return string;
    }
  }
