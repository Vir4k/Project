const Discord = require("discord.js");
const botconfig = require('../config.json');

module.exports = (bot) => {
  console.log("Hello, This Project is now online");
  bot.user.setActivity("with " + bot.guilds.cache.size + ' server(s) || Type ' + botconfig.prefix + 'help');
  setInterval(() => {
    let activities = [{text:`with ${bot.guilds.cache.size.toLocaleString()} server(s) || Type ${botconfig.prefix}help`,type:"p"},{text:`Managing ${bot.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString()} members`,type:"p"},{text:`${bot.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString()} Users`,type:"w"},{text:"with iVirakTV :3",type:"p"}];
    let randomactivity = activities[Math.floor(Math.random() * activities.length)];
    
    if(randomactivity.type === "p"){
      bot.user.setActivity(randomactivity.text, { type: 'PLAYING' })
    }else if(randomactivity.type === "w"){
      bot.user.setActivity(randomactivity.text, { type: 'WATCHING' })
    }
  },60000);
};
