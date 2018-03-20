const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANGE_MESSAGES")) return message.channel.send("Do not have permission")
  if (!args[0]) return message.channel.send("what ammount of messages would u like to delete");
  if (args[0] > 100) return message.channel.send("You cannot delete more than 100 messages");
  if (isNaN(args[0])) return message.channel.send(`**${args[0]}** is not a number`);

  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared **${args[0]}** messages`).then(msg => msg.delete(5000));
  });

}

module.exports.help = {
  name: "clear"
}