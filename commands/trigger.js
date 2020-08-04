const Discord = require('discord.js')
const bot = require('../config.json');
let canva = require('canvacord');
let newCanva = new canva();

module.exports.run = async (bot, message, args) => {
  
  let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
let ifMention;
if(mention){
  ifMention = mention.user;
} else {
  ifMention = message.author;
}

let triggered = await newCanva.trigger(ifMention.displayAvatarURL({
  dynamic: true,
  size: 2048,
  format: 'png'
}));

return message.channel.send({ files: [{ attachment: triggered, name: "Triggered.gif"}] });
}

module.exports.config = {
  name: "trigger",
  description: "Shows a triggered gif of a user's avatar",
  usage: `${bot.prefix}trigger [User]`,
  accessedBy: "members",
  aliases: []
}
