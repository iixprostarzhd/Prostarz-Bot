//Require's
const botConfig = require("./botConfig.json");
const tokenFile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");

//Set bot
const bot = new Discord.Client({
  disableEveryone: true
});

const queue = new Map();

module.exports.queue = queue;

bot.commands = new Discord.Collection();

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


bot.login(tokenFile.token);