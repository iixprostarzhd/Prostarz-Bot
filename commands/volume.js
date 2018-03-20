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
  if (!serverQueue) return message.channel.send("There is nothing playing to change the volume on");

  if (!args[0]) return message.channel.send(`the current volume is: **${serverQueue.volume}**`);
  if (args[0] > 10) return message.channel.send(`sorry cant set the volume above 10`);

  serverQueue.volume = args[0];
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
  return message.channel.send(`I have set the volume to: **${serverQueue.volume} / 10**`)
}

module.exports.help = {
  name: "volume"
}