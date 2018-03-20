const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Generating...");

  let target = message.mentions.users.first() || message.author;

  let userIEmbed = new Discord.RichEmbed()
    .setTitle("SOME INFO")
    .setColor("#e74c3c")
    .setThumbnail(target.avatarURL)
    .addField("USERNAME", target.tag, true)
    .addField("ID", target.id, true)
    .setFooter(message.createdAt);

  await message.channel.send(userIEmbed);


  msg.delete();
}

module.exports.help = {
  name: "info"
}