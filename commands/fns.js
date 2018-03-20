const Discord = require("discord.js");
const token = require("../token.json");
const botConfig = require("../botConfig.json");
const Fortnite = require('fortnite');
const user = new Fortnite(token.fortnite);

module.exports.run = async (bot, message, args) => {

  let prefix = botConfig.prefix;
  var platforms = ["pc", "xbl", "psn"];
  var userInfo;

  if (!Fortnite) return message.channel.send("I broke try again!");

  let platform = args[0];
  let username = args.slice(1).join(" ");
  console.log(username);

  if (!args[0] || !args[1]) return message.channel.send(`Usage: ${prefix}fns **<platform ${platforms.join(", ")}>** **<username>**`);
  if (!["pc", "xbl", "psn"].includes(args[0])) return message.channel.send(`**Please include the platform: ${platforms.join(", ")}**`);
  let msg = await message.channel.send("Generating...");

  await user.getInfo(username, platform).then(data => userInfo = data);

  let FTSEmbed = new Discord.RichEmbed()
    .setTitle(`FORTNITE STATS FOR ${userInfo.username.toUpperCase()}`)
    .setColor(botConfig.blue)
    .setThumbnail("https://vignette.wikia.nocookie.net/fortnite/images/d/d8/Icon_Founders_Badge.png/revision/latest?cb=20170806011008")
    .addField("USERNAME", userInfo.username, true)
    .addField("PLATFORM", userInfo.platform, true)
    .addField("TOP PLACEMENTS", `**WINS:** ${userInfo.lifetimeStats[8].value}\n**TOP 3s:** ${userInfo.lifetimeStats[0].value}\n**TOP 5s:** ${userInfo.lifetimeStats[3].value}\n**TOP 12s:** ${userInfo.lifetimeStats[4].value}\n**TOP 25s:** ${userInfo.lifetimeStats[5].value}`, true)
    .addField("STATS", `**TIME PLAYED:** ${userInfo.lifetimeStats[13].value}\n**K/D:** ${userInfo.lifetimeStats[11].value}\n**MATCHES PLAYED:** ${userInfo.lifetimeStats[7].value}`, true)
    .setFooter(message.createdAt, "https://upload.wikimedia.org/wikipedia/commons/3/36/Fortnite.png");

  await message.channel.send(FTSEmbed);

  msg.delete();


}

module.exports.help = {
  name: "fns"
}