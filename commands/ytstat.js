const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    let name = args.join(" ");
    if (!name) return message.channel.send("Unknown channel name.");

    const channelGet = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${config.google}&maxResults=1&type=channel`)
    .catch(() => {
      return message.channel.send("Unknown channel error.");
      });
      
let channel = await channelGet.json();

    if (!channel.items[0]) return message.channel.send("No channel result. Try again.");

    const dataGet = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.items[0].id.channelId}&key=${config.google}`)
    .catch(() => {
      return message.channel.send("Unknown channel data error.");
      });

let data = await dataGet.json();

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(channel.items[0].snippet.thumbnails.high.url)
    .setTimestamp()
    .addField("Channel Name", channel.items[0].snippet.channelTitle, true)
    .addField("Channel Description", channel.items[0].snippet.description, true)
    .addField("Subscribers Count", parseInt(data.items[0].statistics.subscriberCount).toLocaleString(), true)
    .addField("Total Views", parseInt(data.items[0].statistics.viewCount).toLocaleString(), true)
    .addField("Total Video(s)", parseInt(data.items[0].statistics.videoCount).toLocaleString(), true)
    .addField("Date Created", new Date(channel.items[0].snippet.publishedAt).toDateString(), true)
    .addField("Link", `[${channel.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.items[0].id.channelId})`, true)
    return message.channel.send(embed);
}

module.exports.config = {
  name: "ytstat",
  description: "Check info of other channel or own channel",
  usage: `${config.prefix}ytstat [channel]`,
  accessedBy: "Members",
  aliases: ["youtube", 'yt'],
  category: "information"
}
