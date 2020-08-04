const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  let cMention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  let cUser;
  if (cMention) {
    cUser = cMention;
  } else {
    cUser = message.member;
  }

  let coins = await db.fetch(`coins_${cUser.id}`);
  if (coins === null) coins = 0;
  console.log(coins);

  let coinEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${cUser.user.username}\'s Balance !`)
    .setThumbnail(cUser.user.displayAvatarURL({
      dynamic: true,
      size: 1024,
      format: 'png'
    }))
    .setDescription(`**${parseInt(coins).toLocaleString()}** <:coin:739828029856940032>`)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())

  return message.channel.send(coinEmbed);
}

module.exports.config = {
  name: 'balance',
  description: 'Check your balance.',
  usage: `${config.prefix}balance [user or ID]`,
  accessedBy: 'members',
  aliases: ['bal']
}
