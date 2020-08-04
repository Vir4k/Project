const Discord = require('discord.js');
const bot = new Discord.Client();
const chalk = require('chalk');
const https = require('https');
const mysql = require('mysql');
const botconfig = require('./config.json');
const serverFile = require('./server.js');

bot.devid = '725968708358373477';

require('./util/eventHandler')(bot);
bot.changelogs = require('./changelogs.json');
serverFile.run();

const fs = require('fs');
const { config } = require('process');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.queues = {};

fs.readdir('./commands/', (err, files) => {
	if (err) console.log(err);

	let jsfile = files.filter(f => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		return console.log("[LOGS] Couldn't Find Commands!");
	}

	jsfile.forEach((f, i) => {
		let pull = require(`./commands/${f}`);
		if (!pull.config.blocked) {
			bot.commands.set(pull.config.name, pull);
			pull.config.aliases.forEach(alias => {
				bot.aliases.set(alias, pull.config.name);
			});
		}
	});
});

bot.play = function(connection,message){
  bot.queues[message.guild.id].dispatcher = connection.playStream(ytdl(bot.queues[message.guild.id].queue[0],{filter:"audioonly"}));
  bot.queues[message.guild.id].queue.shift();
  bot.queues[message.guild.id].dispatcher.on("end",() => {
    if(bot.queues[message.guild.id].queue[0]){
      bot.play(connection,message);
    }else{
      connection.disconnect();
    }
  });
}

bot.on('message', async message => {
	if (message.author.bot) return;//If a Bot say .help or something. This Bot Will Not Answer it

	let prefix = botconfig.prefix;
	let msgarray = message.content.toLowerCase().split(' ');
	let cmd = msgarray[0];
	let args = msgarray.slice(1);
  
	if (
		[
			'fuck',
			'bitch',
			'asshole',
			'shit',
			'fucker',
      'Piss off',
      'son of a bitch',
      'bitch',
      'dick',
      'ass'
		].some(w => message.content.toLowerCase().includes(w.toLowerCase()))
	) {
		if (message.deletable) {
			message.delete();
		}
		let dontBeToxic = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('System Message')
			.setDescription(
				`${
					message.author
				} **Hold on, don't use** \`inappropriate\` **words here !!!**`
			)
			.setTimestamp();

		return message.channel.send(dontBeToxic);
	}
	
	if(!message.member.hasPermission("ADMINISTRATOR")){
	  if(message.content.match(/^https\:\/\/discord\.gg\/.{7}/)){
	    await message.delete();
	    message.channel.send("Invite links are not allowed");
	  }
	}

  if(message.content.startsWith(`<@${bot.user.id}>`) || message.content.startsWith(`<@!${bot.user.id}>`)){
    let prefixEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("System Message")
    .setDescription(`My prefix for this server is \`${prefix}\``)
    .setTimestamp();
    
    return message.channel.send(prefixEmbed);
  }
  
	if (!message.content.startsWith(prefix)) return;
	let commandfile =
		bot.commands.get(cmd.slice(prefix.length)) ||
		bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
	if (commandfile) commandfile.run(bot, message, args);
});

bot.login(process.env.TOKEN); //start the bot
