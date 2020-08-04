const Discord = require('discord.js')
const bot = require('../config.json');
const emoji = require('../emoji.json');
const fs = require("fs");
const chalk = require("chalk");
const https = require("https");

module.exports.run = async (bot, message, args) => {
if (!message.member.hasPermission("BAN_MEMBERS")) //Checks if user has permission to run the command.
    return message.channel.send("You are not allowed to run that command.");

  let member = message.mentions.members.first(); //We specify the member we wish to ban.
  if (!member) return message.channel.send("Please specify a valid user."); //If we don't specify a user, nor enter a valid user, it will will respond, letting us know to type a valid user.
  if (!member.bannable) //This checks if the user can be banned, if their permissions don't enable them to get banned, such as Admins, it will let you know it can't ban them.
    return message.channel.send("Unable to ban specified user.");

  let reason = args.slice(1).join(" "); //Here we specify the reason they got banned, it is optional, but it helps for mod logs.
  if (!reason) reason = "No reason provided."; //If they don't specify a reason, we automatically set the reason as "No reason provided."

  await member
    .ban(reason) //Here we ban the user.
    .catch(error => //We check if there is an error. If there is an error, it will display it in the chat.
      message.channel.send(`Unable to ban user because of: ${error}.`)
    );
  message.channel.send(`Successfully banned ${member.user.tag}.`); //If there is no error, and the user was banned, we let them know they were banned successfuly.
  return;
};

module.exports.config = {
    name: 'ban',
    description: 'Ban some guy out of The Server',
    usage: `${bot.prefix}ban`,
    accessableby: 'Admins',
    aliases: []
}
