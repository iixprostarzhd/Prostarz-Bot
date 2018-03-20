const Discord = require("discord.js");
const snek = require("snekfetch");

//set api url
const api = "https://random.dog/woof.json";

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Generating...");

  let file = (await snek.get(api)).body.url;
  if (!file) return message.channel.send("I broke! Try again.");

  let dogEmbed = new Discord.RichEmbed()
    .setTitle("Dog")
    .setColor("#3498db")
    .setImage(file);

  await message.channel.send(dogEmbed);

  msg.delete();

}

module.exports.help = {
  name: "dog"
}