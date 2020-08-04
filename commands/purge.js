const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) //Here we check if the user can run the command.
    return message.channel.send("You are not allowed to run this command.");

  const deleteCount = parseInt(args[0], 10); //This will get the number of messages we want to delete as an integer.
  if (!deleteCount || deleteCount < 2 || deleteCount > 100) //This makes sure that the minimum amount of messages we can delete is 2, and the max is 100. You can change this if you want.
    return message.channel.send(
      "Please specify how many messages you would like to purge. (min 2, max 100)"
    );
  message.channel
    .bulkDelete(deleteCount) //This will delete the specified number of messages.
    .catch(error =>
      message.channel.send(`Couldn't purge messages because of, ${error}.`) //This will make the bot send a message if there is an error.
    );
};

module.exports.config = {
    name: 'purge',
    description: 'Clear message',
    usage: `${bot.prefix}purge`,
    accessableby: 'Members',
    aliases: []
}
