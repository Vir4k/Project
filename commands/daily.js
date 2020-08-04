const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  let cooldown = await db.fetch(`dailyCooldown_${message.author.id}`);
  
  let timeout = this.config.cooldown;
  
  if(cooldown !== null && timeout - (Date.now() - cooldown) > 0){
    let time = ms(timeout - (Date.now() - cooldown));
    
    let cooldownEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Already claimed")
    .setDescription(`You\'ve already claimed your daily in the past 24 hours, you can claim another daily in **${Object.entries(time).filter(t => t[1] > 0 && t[0] !== "milliseconds").map(at => `${at[1]} ${at[1] === 1 ? (at[0].charAt(0).toUpperCase() + at[0].slice(1)).slice(0, -1) : at[0].charAt(0) + at[0].slice(1)}`).join(", ")}**!`)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())

    return message.channel.send(cooldownEmbed);
  } else {
    await db.add(`coins_${message.author.id}`, 4000);
    await db.set(`dailyCooldown_${message.author.id}`, Date.now());
    
    let dailyEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL({
      dynamic: true,
      size: 1024,
      format: 'png'
    }))
    .setAuthor("Daily claimed!")
    .setDescription("4000 coins have been added to your balance!")
    .setTimestamp();
    
    return message.channel.send(dailyEmbed);
  }
}

module.exports.config = {
    name: 'daily',
    description: 'claim your daily money',
    usage: `${config.prefix}daily`,
    accessableby: 'Members',
    aliases: [],
    cooldown: 86400000
}
