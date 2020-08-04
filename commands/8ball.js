const Discord = require('discord.js')
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let args1 = message.content.substring(message.content.indexOf(' ')+1);
    let replies = [
    "Yes?",
    "No?",
    "As I see it, yes.",
    "Most likely.",
    "Yes – definitely.",
    "My reply is no.",
    "Better not tell you now.",
    "Ask again later."
    ];
    
    if(!args1) {
    return message.channel.send('What is the question? My Friend.')
    }

    let result = replies[Math.floor(Math.random()*(replies.length))]

    const embed = new Discord.MessageEmbed()
    .setTitle(':8ball:')
    .setDescription(`**${message.author.tag} Question:**\n${args1}\n**My Answer:**\n${result}`)
    .setFooter(`${bot.user.username}`)
    .setColor("RANDOM")
    .setTimestamp()

    message.channel.send(embed);
}


module.exports.config = {
    name: '8ball',
    description: 'Let Me Answer Your Question',
    usage: `${config.prefix}8ball`,
    aliases: ["question"]
}
