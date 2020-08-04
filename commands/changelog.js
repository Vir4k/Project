const Discord = require('discord.js')
const config = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
  let logs = ((bot.changelogs.logs)[0])
  let loglength = Object.keys(logs).length;
  const embed = new Discord.MessageEmbed()
    .setDescription(logs[`${loglength}`].desc)
    .setColor("RANDOM")
    .setFooter(`Log date: ${logs[loglength].date}`)
    .setTimestamp()
    
  message.channel.send(embed);
}

module.exports.config = {
    name: 'changelog',
    description: 'Sends the Changelog',
    usage: `${config.prefix}changelog`,
    accessableby: 'Members',
    aliases: []
}
