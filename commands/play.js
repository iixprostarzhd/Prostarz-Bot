const {
  Discord,
  Util
} = require("discord.js");
const token = require("../token.json");
const index = require("../index.js");
const ytdl = require("ytdl-core");
const botConfig = require("../botConfig.json");

module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voiceChannel;

  const queue = index.queue;
  const serverQueue = index.serverQueue;

  if (!voiceChannel) return message.channel.send("You are not in a voice channel please join a channel and use this command again");

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) return message.channel.send("I do not have the permissions to join that voice channel pleae give me permissions to join");
  if (!permissions.has("SPEAK")) return message.channel.send("I do not have the permissions to speak in that voice channel pleae give me permissions to join");

  const songInfo = await ytdl.getInfo(args[0]);
  const song = {
    title: Util.escapeMarkdown(songInfo.title),
    url: songInfo.video_url
  };

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

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      index.play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.log(`Could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`**${song.title}** has been added to the queue!`);
  };
}

module.exports.help = {
  name: "play"
}