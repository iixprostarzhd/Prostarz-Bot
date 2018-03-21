const Discord = require("discord.js");
const token = require("../token.json");
const index = require("../index.js");
const ytdl = require("ytdl-core");
const botConfig = require("../botConfig.json");

module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voiceChannel;

  const queue = index.queue;
  const serverQueue = index.serverQueue;

  if (!voiceChannel) return message.channel.send("You are not in a voice channel please join a channel and use this command again");

  if (serverQueue) return message.channel.send("There is still songs in the queue for me to leave please remove all songs from the queue** *stop **and run me again");

  await voiceChannel.leave();

  return message.channel.send("I have been removed from your voice channel");
}

module.exports.help = {
  name: "leave"
}