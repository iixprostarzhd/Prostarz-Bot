const Discord = require("discord.js");
const token = require("../token.json");
const index = require("../index.js");
const ytdl = require("ytdl-core");
const botConfig = require("../botConfig.json");

module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voiceChannel;

  const queue = index.queue;
  const serverQueue = index.serverQueue;

  if (!serverQueue) return message.channel.send("There is nothing playing");

  return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
  		`);
  return message.channel.send("``` __**Song queue:**__ \n" + serverQueue.songs.map(song => `**-** ${song.title}`).join('\n') + " **Now playing:** \n" + serverQueue.songs[0].title + "```");

}

module.exports.help = {
  name: "queue"
}