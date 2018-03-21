const Discord = require("discord.js");
const token = require("../token.json");
const index = require("../index.js");
const ytdl = require("ytdl-core");
const botConfig = require("../botConfig.json");
const YouTube = require("simple-youtube-api");

module.exports.run = async (bot, message, args) => {
  const youtube = new YouTube(token.youtube);
  const voiceChannel = message.member.voiceChannel;

  const queue = index.queue;
  const serverQueue = index.serverQueue;

  if (!serverQueue) return message.channel.send("There is nothing playing");

  const videoID = await youtube.getVideoByID(serverQueue.songs[0].id);

  let npEmbed = new Discord.RichEmbed()
    .setTitle(videoID.raw.snippet.channelTitle)
    .setColor(botConfig.emerald)
    .setThumbnail(videoID.thumbnails.maxres.url)
    .addField("TITLE", videoID.title)
    .addField("DESCRIPTION", videoID.raw.snippet.description)
    .setFooter(message.createdAt, message.author.avatarURL);

  await message.channel.send(npEmbed);
}

module.exports.help = {
  name: "np"
}