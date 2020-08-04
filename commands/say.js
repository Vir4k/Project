const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
  message.channel.send("**" + args.join(" ") + "**");
  try{
    message.delete();
  }catch(err){}
}

module.exports.config = {
    name: 'say',
    description: 'Sends your Message',
    usage: `${bot.prefix}say`,
    accessableby: 'Members',
    aliases: []
}
