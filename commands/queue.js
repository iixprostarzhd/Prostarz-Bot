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

  let queueEmbed = new Discord.richEmbed()
    .setTitle(`Song Queue (${serverQueue.songs.length + 1})`)
    .setColor(botConfig.blue)
    .addField("**Song queue**", `${serverQueue.songs.Map(song => `**-** ${song.title}`).join("\n")}`)
    .addField("**Now Playing**", `${serverQueue.songs[0].title}`);
}

module.exports.help = {
  name: "queue"
}