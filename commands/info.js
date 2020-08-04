const Discord = require('discord.js')
const config = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("<:mdHelp:568466408548335650> Information Centre")
    .setColor("RANDOM")
    .setDescription("This is a quite easy to use which contains: **Moderate** | **Information** | **Fun** & more systems.")
    .addFields(
      {name: '**Invite**', value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=727448017799479296&permissions=271968370&scope=bot "Cat Police's Invite")`, inline: true},
      {name: '**Support**', value: `[Click Here](https://discord.gg/XYbcPBr "Cat Police's Support")`, inline: true},
      {name: '**Prefix**', value: `${config.prefix}`, inline: true},
      {name: '**Teammate**', value: `<@725968708358373477> <@529493423556919296> <@419019136547684363>`, inline: true},
      {name: '**Goal**', value: `<:Bot_Developer:729983901946216468>`, inline: true}
    )
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())

    message.channel.send(embed);
}

module.exports.config = {
    name: 'info',
    description: 'Send Info of the bot',
    usage: `${config.prefix}info`,
    accessableby: 'Members',
    aliases: ['botinfo']
}
