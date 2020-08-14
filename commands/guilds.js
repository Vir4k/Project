const Discord = require("discord.js");
const botC = require("../config.json");

exports.run = async (bot, message, args) => {
        const guilds = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .addField(`**Guild Count [${bot.guilds.cache.size}]:**`, `${bot.guilds.cache.map(g => g.name).join("\n ")}`)
        return message.channel.send(guilds);
}

module.exports.config = {
        name: "guilds",
        description: "Check BOT Respond Time",
        usage: `${botC.prefix}guilds`,
        accessedBy: "Members",
        aliases: [],
        category: "information"
}
