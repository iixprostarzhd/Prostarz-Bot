const Discord = require("discord.js");
const token = require("../token.json");
const ytdl = require("ytdl-core");
const botConfig = require("../botConfig.json");

module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) return message.channel.send("You are not in a voice channel please joib a channel and use this command again");

  voiceChannel.leave();

}

module.exports.help = {
  name: "stop"
}