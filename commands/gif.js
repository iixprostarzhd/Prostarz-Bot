const Discord = require("discord.js");
const token = require("../token.json");
const botConfig = require("../botConfig.json");
const snek = require("snekfetch");



module.exports.run = async (bot, message, args) => { //set api url

  let searchTerm = args.slice(0).join(" ");
  if (!searchTerm) return message.channel.send("Looks like you did not enter a search term please enter one so we can look for your gif");

  const api = `https://api.giphy.com/v1/gifs/random?api_key=${token.giphy}&tag=${searchTerm}`;
  let msg = await message.channel.send("Generating...");

  let file = (await snek.get(api));
  if (!file || !file.body || !file.body.data) return message.channel.send("I broke! Try again.");
  let fullFule = file.body.data;

  let gifEmbed = new Discord.RichEmbed()
    .setTitle(searchTerm.toUpperCase() + " RANDOM GIF")
    .setColor(botConfig.yellow)
    .setImage(fullFule.image_url)
    .setFooter(message.createdAt, message.author.avatarURL)

  await message.channel.send(gifEmbed);

  msg.delete();

}

module.exports.help = {
  name: "gif"
}