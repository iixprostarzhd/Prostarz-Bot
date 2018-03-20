const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uCoins = coins[message.author.id].coins;

  let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#2ecc71")
    .addField("💸", `You have ${uCoins} coins`);

  message.channel.send(coinEmbed).then(msg => msg.delete(5000));
}



module.exports.help = {
  name: "coins"
}