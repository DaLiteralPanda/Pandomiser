const { Client, MessageEmbed, Discord, ClientUser } = require('discord.js');
const client = new Client();
const fs = require('fs');
const path = require('path');
const prefix = "p!"
var markovQuotes, words, questions;
const quotePath = __dirname + '/data/quotes.txt';
const questionPath = __dirname + '/data/questions.txt';
const wordPath = __dirname + '/data/words.txt';
client.login(process.env.KEY);
const activity_list = [
  `${prefix}help`,
  `${prefix}invite`,
  `${client.guilds.cache.size} servers!`
]
// process.env.KEY
client.on('ready', () => {
  const activity_list = [
    `${prefix}help`,
    `${prefix}invite`,
    `${client.guilds.cache.size} servers!`
  ]
  setInterval(() => {
        const index = Math.floor(Math.random() * (activity_list.length - 1) + 1);
        client.user.setActivity(activity_list[index], { type: 'WATCHING' });
    }, 60000);
  console.log("Bot Online!");

  client.user.setActivity("p!help");
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
  });
})

const embedInvite = new MessageEmbed()
  .setURL("https://discord.com/api/oauth2/authorize?client_id=727208128071991307&permissions=387136&scope=bot")
  .setColor("bbdf32")
  .setAuthor("Pandomiser", "https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
  .setThumbnail("https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
  .setFooter("Made by <@579013278047535115> | <@579292491606523914>")
  .addField("Thanks for inviting me to your server!", "[Invite link](https://discord.com/api/oauth2/authorize?client_id=727208128071991307&permissions=387136&scope=bot)");

const help = new MessageEmbed()
  .setTitle("Help!")
  .setThumbnail("https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
  .setColor("bbdf32")
  .addField("Want a random word?", `${prefix}randomw`)
  .addField("How about a random question?", `${prefix}randomq`)
  .addField("A random *fake* quote?", `${prefix}randomQuote`)
  .addField("Something you'd like to see added to me?", `${prefix}suggestion [suggestion]`)
  .addField("Want me in your server?", `${prefix}invite`);

client.on('message', message => {
  if (message.content === `${prefix}invite`) {
    message.channel.send(embedInvite);
  };

  if (message.content === `${prefix}help`) {
    message.channel.send(help);
  };

  if (message.content === `${prefix}randomw`) {
    fs.readFile(wordPath, 'utf8', function(err, data) {words = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]})
    message.channel.send(words)
  };

  if (message.content === `${prefix}randomq`) {
    fs.readFile(questionPath, 'utf8', function(err, data) {questions = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]})
    message.channel.send(questions);
  };

  if (message.content === `${prefix}randomQuote`) {
    fs.readFile(quotePath, 'utf8', function(err, data) {markovQuotes = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]})
    message.channel.send(markovQuotes);
  };

  if (message.content.startsWith(`${prefix}suggestion`)) {
    const suggestion = message.content.replace(`${prefix}suggestion `, "");
    client.channels.cache.get("730476984194433163").send(`"${suggestion}" - ${message.author.tag}`).then(msg => {
      msg.react("✅");
      msg.react("❎")
    });
  }
});
