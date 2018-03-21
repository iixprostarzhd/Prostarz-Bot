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
    message.channel.send("**⏸ -** I have paused the song for you");
    return serverQueue.connection.dispatcher.pause()
  };

  if (serverQueue.connection.dispatcher.paused) {
    message.channel.send("**▶️ -** I have resumed the song for you");
    return serverQueue.connection.dispatcher.resume()
  };
}

module.exports.help = {
  name: "pause"
}