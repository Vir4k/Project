const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setTitle("Rock, Paper, Scissor")
    .setColor("RANDOM")
    .setDescription("*Choose your weapon.*")
  m = await message.channel.send(embed);
  await m.react("👊");
  await m.react("✋"); 
  await m.react("✌");
  let choices = {};
  await m.awaitReactions((reaction, user) => user.id === message.author.id, {max: 1, time: 60000, errors:['time','max']})
    .then(collected => {
      try{
          succes = collected.get("👊");
          if(succes){  
              choices[message.author.id] = "r"
          }
      }catch(err){

      }
      try{
          succes = collected.get("✋");
          if(succes){  
              choices[message.author.id] = "p"
          }
      }catch(err){

      }
      try{
          succes = collected.get("✌");
          if(succes){  
              choices[message.author.id] = "s"
          }
      }catch(err){

      }
  })
  try{
    await m.reactions.removeAll();
  }catch(err){}
  
  pos = ["r","p","s"]
  choices['ai'] = pos[Math.floor((Math.random() * pos.length))];
  id = 'ai'
  pos = {"r" : "👊","p" : "✋","s" : "✌"}
  embed = new Discord.MessageEmbed()
  .setDescription("You choosed: " + pos[choices[message.author.id]] + "\n" + "Ai" + " choosed: " + pos[choices[id]])
  switch("" + choices[message.author.id] + choices[id]){
    case 'rs':
    case 'pr':
    case 'sp':
        embed.setColor([0,255,0]).setTitle("*Congratulation, you won.*");
        m.edit(embed);
        break;
    case 'rp':
    case 'ps':
    case 'sr':
        embed.setColor([255,0,0]).setTitle("*Sorry, you lost.*");
        m.edit(embed);
        break;
    case 'rr':
    case 'pp':
    case 'ss':
        embed.setColor([200,200,0]).setTitle("*OMG, what a draw.*");
        m.edit(embed);
        break;
  }
}

module.exports.config = {
    name: 'rps',
    description: 'Rock, Papper, Scissor',
    usage: `${bot.prefix}rps`,
    accessableby: 'Members',
    aliases: []
}
