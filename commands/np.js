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
  console.log(videoID);
  return message.channel.send(`Now playing: **${serverQueue.songs[0].title}**`);
}

module.exports.help = {
  name: "np"
}