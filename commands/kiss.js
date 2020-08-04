const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fetch = require('node-fetch')
const usedCommand = new Set();

module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
      message.reply(`You need to wait 3 sec in-order to use this again!`)
    } else {
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
    let user = message.mentions.members.first()

    if (!user) return message.channel.send("Please Mention user or ID");
    if (member.id === message.author.id) return message.channel.send(`Sorry, you can\'t kiss yourself`);
    if (member.id === bot.user.id) return message.channel.send(`I don\'t want to kiss you`);

      fetch("https://nekos.life/api/v2/img/kiss")
        .then(res => res.json())
        .then(body => {
          if (!body)
            return message.channel.send("**Error? Let me work again**");

          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${message.author.tag} kissing ${member.user.tag}`
            )
            .setColor('RANDOM')
            .setImage(body.url)
            .setFooter(
              bot.user.username.toUpperCase(),
              bot.user.displayAvatarURL()
            );

          return message.channel.send(embed);
        });
        
        usedCommand.add(message.author.id);
        setTimeout(() => {
            usedCommand.delete(message.author.id);
        }, 3000); //You can set the ammount of the cooldown here! Its Formated to Miliseconds.
    }
}

module.exports.config = {
    name: 'kiss',
    description: 'Kiss someone',
    usage: `${bot.prefix}kiss`,
    accessableby: 'Members',
    aliases: []
}
