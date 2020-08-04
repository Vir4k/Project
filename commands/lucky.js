const Discord = require("discord.js")
const botconfig = require("../config.json");
const emoji = require('../emoji.json')

module.exports.run = async (bot, message, args) => {
    const lol = ["100", "98", "95", "93", "90", "88", "85", "83", "80", "78", "75", "73", "70", "68", "65", "63", "60", "58", "55", "53", "50", "48", "45", "43", "40", "38", "35", "33", "30", "28", "25", "23", "20", "18", "15", "13", "10", "8", "5", "3", "0"]
    const random = lol[Math.floor(Math.random() * lol.length)];

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Lucky Status`, member.user.displayAvatarURL())
    .setDescription(`${member.user.tag} is **${random}% Lucky**`)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(`${bot.user.username}`)

    message.channel.send(embed);
}

module.exports.config = {
    name: "lucky",
    description: "Showing Your Lucky Status :dollar:",
    usage: `${botconfig.prefix}lucky`,
    accessableby: "Members",
    aliases: []
}
