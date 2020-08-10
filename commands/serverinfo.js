const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");
const dateformat = require('dateformat');

module.exports.run = async (bot, message, args) => {
    let icon = message.guild.iconURL({size: 2048}); // Server Avatar
    
    let region = {
      "brazil": "Brazil",
      "eu-central": "Central Europe",
      "singapore": "Singapore",
      "london": "London",
      "russia": "Russia",
      "japan": "Japan",
      "hongkong": "Hongkong",
      "sydney": "Sydney",
      "us-central": "U.S. Central",
      "us-east": "U.S. East",
      "us-south": "U.S. South",
      "us-west": "U.S. West",
      "eu-west": "Western Europe"
    }
    
    // Members
    let member = message.guild.members;
    let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
        online = member.cache.filter(m => m.user.presence.status === "online").size,
        idle = member.cache.filter(m => m.user.presence.status === "idle").size,
        dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
        robot = member.cache.filter(m => m.user.bot).size,
        total = message.guild.memberCount;
    
    // Channels
    let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size,
        vc = channels.cache.filter(r => r.type === "voice").size,
        category = channels.cache.filter(r => r.type === "category").size,
        totalchan = channels.cache.size;
    
    // Region
    let location = region[message.guild.region];
    
    // Date
    let x = Date.now() - message.guild.createdAt;
    let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
    let created = dateformat(message.guild.createdAt); // Install "dateformat" first.
    
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .setThumbnail(icon)
    .setAuthor(message.guild.name, icon)
    .setDescription(`**Server ID:** \n${message.guild.id}`, true)
    .addField("Region:", location, true)
    .addField("Date Created:", `${created} \nsince **${h}** day(s)`, true)
    .addField("Owner:", `**${message.guild.owner.user.tag}** \n\`${message.guild.owner.user.id}\``, true)
    .addField(`<:mdUsers:568466409714089994> Members: [${total}]`, `<:online:731040708261314601> Online: ${online} \n<:idle:731040741161173002>Idle: ${idle} \n<:dnd:731040761600278558> DND: ${dnd} \n<:offline:731040776649179137> Offline: ${offline} \n<:bot:738331649003225108> Bots: ${robot}`, true)
    .addField(`Channels: [${totalchan}]`, `Text: ${text} \nVoice: ${vc} \nCategory: ${category}`, true)
    message.channel.send(embed); // Let's see if it's working!
}

module.exports.config = {
    name: 'serverinfo',
    description: '',
    usage: `${bot.prefix}serverinfo`,
    accessableby: 'Members',
    aliases: ['guildinfo']
}
