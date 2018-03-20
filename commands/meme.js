const Discord = require("discord.js");
const snek = require("snekfetch");
const botConfig = require("../botConfig.json")

//set api url
const api = "https://api.imgflip.com/get_memes";

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Generating...");

  let file = (await snek.get(api)).body.data.memes;
  if (!file) return message.channel.send("I broke! Try again.");

  let rndMeme = Math.floor(Math.random() * file.length);

  let memeEmbed = new Discord.RichEmbed()
    .setTitle(file[rndMeme].name)
    .setColor(botConfig.yellow)
    .setImage(file[rndMeme].url);

  await message.channel.send(memeEmbed);

  msg.delete();
}

module.exports.help = {
  name: "meme"
}