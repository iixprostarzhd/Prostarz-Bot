const Discord = require("discord.js");
const snek = require("snekfetch");

//set api url
const api = "http://aws.random.cat/meow";

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Generating...");

  let file = (await snek.get(api)).body.file;
  if (!file) return message.channel.send("I broke! Try again.");

  let catEmbed = new Discord.RichEmbed()
    .setTitle("Cat")
    .setColor("#3498db")
    .setImage(file);

  await message.channel.send(catEmbed);

  msg.delete();


}

module.exports.help = {
  name: "cat"
}