const Discord = require('discord.js');
const bot = require('../config.json');

module.exports.run = async (bot, message, args) => {
    let command = args[0];
    if(bot.commands.has(command)) {
        command = bot.commands.get(command);
        var embed = new Discord.MessageEmbed()
        .setTitle(`${command.config.name}`)
        .setDescription(`${command.config.description}`)
        .setColor('RANDOM')
        .addField(`Usage`,`${command.config.usage}`,true)
        try{
          embed.addField(`Aliases`,`${command.config.aliases.toString()}`,true)
        }catch(e){}
        if(command.config.cooldown != undefined){
          if(command.config.cooldown / 3600 >= 1){
            embed.addField(`Cooldown`,`${command.config.cooldown / 3600 / 1000} hour(s)`,true)
          }else if(command.config.cooldown / 60 >= 1){
            embed.addField(`Cooldown`,`${command.config.cooldown / 60 / 1000} minute(s)`,true)
          }else{
            embed.addField(`Cooldown`,`${command.config.cooldown} second(s)`,true)
          }
        }
        embed.addField(`Permissions`,`${command.config.accessableby}`);
        embed.setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())

    message.channel.send(embed);
  }
}

module.exports.config = {
    name: 'guide',
    description: 'Guide you about commands',
    usage: `${bot.prefix}guide [command]`,
    accessableby: 'Members',
    aliases: []
}
