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

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) return message.channel.send("I do not have the permissions to join that voice channel pleae give me permissions to join");
  if (!permissions.has("SPEAK")) return message.channel.send("I do not have the permissions to speak in that voice channel pleae give me permissions to join");

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);
    try {
      var connection = await voiceChannel.join();
    } catch (error) {
      console.log(`Could not join the voice channel: ${error}`);
    }

  }



  const dispatcher = connection.playStream(ytdl(args[0]))
    .on('end', () => {
      console.log('song ended!');
      voiceChannel.leave();
    })
    .on('error', error => {
      console.error(error);
    });

  dispatcher.setVolumeLogarithmic(5 / 5);

}

module.exports.help = {
  name: "play"
}