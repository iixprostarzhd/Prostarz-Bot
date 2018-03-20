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
  const youtube = index.youtube;
  const searchTerm = args.slice(0).join(" ");
  const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';

  if (!voiceChannel) return message.channel.send("You are not in a voice channel please join a channel and use this command again");

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) return message.channel.send("I do not have the permissions to join that voice channel pleae give me permissions to join");
  if (!permissions.has("SPEAK")) return message.channel.send("I do not have the permissions to speak in that voice channel pleae give me permissions to join");


  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    const playlist = await youtube.getPlaylist(url);

    //TODO: refactor
  } else {
    try {
      var video = await youtube.getVideo(searchTerm);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchTerm, 1);
        var video = await youtube.getVideoByID(videos[0].id);
      } catch (err) {
        console.error(err);
        return message.channel.send(`I could not find that video`);
      }
    }

    return index.handleVideo(video, message, voiceChannel);
  }
}

module.exports.help = {
  name: "play"
}