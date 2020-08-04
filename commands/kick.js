const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) //Checks if user has permission to run the command.
    return message.channel.send("You are not allowed to run that command.");

  let member = message.mentions.members.first(); //We specify the member we wish to kick.
  if (!member) return message.channel.send("Please specify a valid user."); //If we don't specify a user, nor enter a valid user, it will will respond, letting us know to type a valid user.
  if (!member.kickable) //This checks if the user can be kicked, if their permissions don't enable them to get kicked, such as Admins, it will let you know it can't kick them.
    return message.channel.send("Unable to kick specified user.");

  let reason = args.slice(1).join(" "); //Here we specify the reason they got kicked, it is optional, but it helps for mod logs.
  if (!reason) reason = "No reason provided."; //If they don't specify a reason, we automatically set the reason as "No reason provided."

  await member
    .kick(reason) //Here we kick the user.
    .catch(error => //We check if there is an error. If there is an error, we display it in the chat.
      message.channel.send(`Unable to kick user because of: ${error}.`)
    );
  message.channel.send(`Successfully kicked ${member.user.tag}.`); //If there is no error, and the user was kicked, we let them know they were kicked successfuly.
  return;
};

module.exports.config = {
    name: 'kick',
    description: 'Kick Someone From the Server',
    usage: `${bot.prefix}kick`,
    accessableby: 'Admins',
    aliases: []
}
