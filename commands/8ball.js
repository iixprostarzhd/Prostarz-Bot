const Discord = require("discord.js");
const botConfig = require("../botConfig.json")

module.exports.run = async (bot, message, args) => {
  if (!args[1]) return message.reply("Please ask a full question!");
  let replies = ["yes.", "No", "I don't know", 'Why are you even trying?', 'What do you think? NO', "Ask again later"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor(botConfig.blue)
    .addField("QUESTION", question)
    .addField("Answer", replies[result]);

  message.channel.send(ballEmbed);

}

module.exports.help = {
  name: "8ball"
}