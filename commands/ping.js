const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
let pinging = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription("Pinging...")
.setTimestamp();

let sentPing = await message.channel.send(pinging);
let pingEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor("🏓 Pong!")
.setDescription(`<a:blue_steam:732949146658406552> Bot ping: \`${Math.round(bot.ws.ping)}\`ms\n<a:computer_loading:732949167743434782> API ping: \`${sentPing.createdTimestamp - message.createdTimestamp}\`ms`)

sentPing.edit(pingEmbed);
}

module.exports.config = {
    name: 'ping',
    description: 'Showing a Ping',
    usage: `${bot.prefix}ping`,
    accessableby: 'Members',
    aliases: []
}
