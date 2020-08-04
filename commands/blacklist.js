const Discord = require('discord.js')
const config = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addFields(
      {name: '**Creator of GTXY / Scammer:**', value: `<@668062085699076118>`, inline: true},
      {name: '**Creator of GTXY / DDoser:**', value: `<@401063858787188737>`, inline: true},
      {name: '**Annoying people:**', value: `<@615076296594161667>`, inline: false},
      )
    message.channel.send(embed);
}

module.exports.config = {
    name: 'blacklist',
    description: 'Send Blacklisted people',
    usage: `${config.prefix}blacklist`,
    accessableby: 'Members',
    aliases: []
}
