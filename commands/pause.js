const Discord = require("discord.js");
const token = require("../token.json");
const index = require("../index.js");
const ytdl = require("ytdl-core");
const botConfig = require("../botConfig.json");

module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voiceChannel;

  const queue = index.queue;
  const serverQueue = index.serverQueue;

  if (!voiceChannel) return message.channel.send("You are not in a voice channel please joib a channel and use this command again");

  if (!serverQueue) return message.channel.send("There is nothing in the queue to skip");

  if (!serverQueue.connection.dispatcher.paused) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return message.channel.send("**⏸ -** I have paused the song for you");
  };

  if (serverQueue.connection.dispatcher.paused) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.channel.send("**▶️ -** I have resumed the song for you");
  };
}

module.exports.help = {
  name: "pause"
}