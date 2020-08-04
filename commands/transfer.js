const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const db = require("quick.db");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
  let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if (mention) {
      let coins = await db.fetch(`coins_${message.author.id}`);
      if (coins === null) coins = 0;
      let ocoins = await db.fetch(`coins_${mention.id}`);
      if (ocoins === null) ocoins = 0;
      if(args.slice(1)[0]){  
        if(parseInt(args.slice(1)[0]) <= coins){
          await db.subtract(`coins_${message.author.id}`, parseInt(args.slice(1)[0]));
          await db.add(`coins_${mention.id}`, parseInt(args.slice(1)[0]))
          message.channel.send(`Succesfully transfered ${args.slice(1)[0]}coins!`);
        }else{
          message.channel.send("You don´t have enough Coins to transfer this Amount!");
        }
      }else{
        message.channel.send("Please provide an Amount of Coins");
      }
  }else{
    message.channel.send("Please provide a User/Id");
  }
}

module.exports.config = {
    name: 'transfer',
    description: 'Transfer or pay other',
    usage: `${bot.prefix}transfer [User] [Amount]`,
    accessableby: 'Members',
    aliases: ['pay']
}
