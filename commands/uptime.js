const Discord = require("discord.js");
const botConfig = require("../botConfig.json");
var index = require('../index.js');

var upSecs = 0;
var upMins = 0;
var upHours = 0;
var upDays = 0;

setInterval(function() {
  upSecs = upSecs + 1;
  if (upSecs >= 60) {
    upSecs = 0;
    upMins = upMins + 1;
  }
  if (upMins >= 60) {
    upMins = 0;
    upHours = upHours + 1;
  }
  if (upHours >= 24) {
    upHours = 0;
    upDays = upDays + 1;
  }
}, 1000);

module.exports.run = async (bot, message, args) => {
  message.channel.send("```Current Uptime: \n" + upDays + " Days \n" + upHours + " Hours \n" + upMins + " Minutes \n" + upSecs + " Seconds```");
}

module.exports.help = {
  name: "uptime"
}