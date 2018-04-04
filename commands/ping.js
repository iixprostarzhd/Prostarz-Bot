const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const msg = await message.channel.send("Ping?");

  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}

module.exports.help = {
  name: "ping"
}