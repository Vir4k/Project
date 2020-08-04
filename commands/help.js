const Discord = require('discord.js')
const bot = require('../config.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if(helpArgs[0] === 'command') {
        return message.reply("Please Input a Commands")
    }

    if(!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
        .setTitle("<:mdSearch:568466408938143779> Help Menu")
        .setColor("RANDOM")
        .setThumbnail('https://cdn.discordapp.com/attachments/727825353497772103/735793965563117628/2551_CatPolice.png')
        .addField("Moderate","`ban` `kick`")
        .addField("Help","`links`")
        .addField("Information", "`userinfo` `ping` `info` `blacklist` `serverinfo` `avatar`")
        .addField("Fun","`meme` `say` `rps` `trigger` `jail` `wanted` `8ball` `lesbian` `gender` `lucky` `kiss`")
        .addField("Economy","`daily` `balance`")
        .addField("Animal","`dog` `puppy` `cat` `kitty` `bird` `parrot` `turtle` `rabbit` `fish` `dolphin` `panda` `bear`")
        .addField("Social","`art` `anime`")
        .addField("Update","`changelog`")
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())

    message.channel.send(embed);
  }}

module.exports.config = {
    name: 'help',
    description: 'Show a menu of the command that are made in this bot.',
    usage: `${bot.prefix}help`,
    accessableby: 'Member',
    aliases: []
}
