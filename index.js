//Require's
const botConfig = require("./botConfig.json");
const tokenFile = require("./token.json");
const {
  Client,
  Collection,
  Util
} = require('discord.js');
const fs = require("fs");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

//Set bot
const bot = new Client({
  disableEveryone: true
});

const youtube = new YouTube(tokenFile.youtube);

const queue = new Map();

module.exports.queue = queue;

bot.commands = new Collection();

bot.on('ready', async () => {
  let serversOn = bot.guilds.size;
  let servers = " servers";

  if (serversOn === 1) {
    servers = " server";
  }

  let serverSize = serversOn + servers;
  console.log(`${bot.user.username} is ready to go on ${serverSize}`);
  bot.user.setActivity("IM JUST SOME CODE!");
});

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile <= 0) {
    console.log("couldn't find any commands");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props)
  });
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botConfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  const serverQueue = queue.get(message.guild.id);
  module.exports.serverQueue = serverQueue;

  if (!cmd.startsWith(prefix)) return;
  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if (commandFile) commandFile.run(bot, message, args);
});

module.exports.handleVideo = async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
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
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
      console.log(reason);
      serverQueue.songs.shift();
      play(message.guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  message.channel.send(`Started playing: **${song.title}**`);
}

bot.login(tokenFile.token);