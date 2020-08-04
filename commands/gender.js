const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    const lol = ["Male", "Female"]
    const random = lol[Math.floor(Math.random() * lol.length)];

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Real Gender System!`, member.user.displayAvatarURL())
    .setDescription(`${member.user.tag} Your Real Gender is **${random}**`)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(`${bot.user.username}`)

    message.channel.send(embed);
}

module.exports.config = {
    name: "gender",
    description: "Showing Your Real Gender :V",
    usage: `${botconfig.prefix}gender`,
    accessableby: "Members",
    aliases: []
}
