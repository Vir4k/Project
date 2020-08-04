const Discord = require('discord.js')
const bot = require('../config.json');
const canva = require('canvacord');
let newCanva = new canva();

module.exports.run = async (bot, message, args) => {
  

   let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
   
   let ifMention;
   if(mention){
     ifMention = mention.user;
   } else {
     ifMention = message.author;
   }
   
   let jailed = await newCanva.rip(ifMention.displayAvatarURL({
     dynamic: true,
     size: 2048,
     format: 'png'
   }));
   
   return message.channel.send({ files: [{ attachment: jailed, name: "Rip.png"}] });
}

module.exports.config = {
  name: "rip",
  description: "Shows an image of a user's avatar on a tomb",
  usage: `${bot.prefix}rip [User]`,
  accessedBy: "member",
  aliases: []
}
