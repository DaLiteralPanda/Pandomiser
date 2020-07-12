const { Client, MessageEmbed, Discord, ClientUser } = require('discord.js');
const client = new Client();
const fs = require('fs');
const path = require('path');
//prefix = 'p!'

// Runs when Bot is ready
client.on('ready', () => {
  console.log("Bot Online!");

  client.user.setActivity("p!help");
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
  bot_commands = '727206999317676132';
  genral = '727206852923883551';
});
  let genralChannel = client.channels.cache.get(genral);
  let botChannel = client.channels.cache.get(bot_commands);
  //botChannel.send("I am online boiii!");
});

//invite command
client.on('message', message => {
  if (message.content === `p!invite`) {
    let embed = new Discord.MessageEmbed()
    .setAuthor("Pandomiser","https://cdn.discordapp.com/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
    .setThumbnail("https://cdn.discordapp.com/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
    .setColor("#bbdf32")
    .addField("Thanks for adding our bot to your server!","[Invite link](https://discordapp.com/oauth2/authorize?client_id=724885507263168602&scope=bot&permissions=8208)")
    message.channel.send(embed)
  }
});
// help command
const help = {
  title: 'Help Command',
  //thumbnail: 'attachment://logo',
  color: '#bbdf32',
  fields: [
    { name: 'Want to generate random words?', value: `p!randomw`},
    { name: 'Want to generate some random questions?', value: `p!randomq`},
  ],
  //image: 'attachment://logo',
};

client.on('message', message => {
  if (message.content === `p!help`) {
    message.channel.send({embed: help});
  };
});

// random word command
const wordPath = path.join(__dirname, './data/words.txt');
client.on('message', message => {
  if (message.content === "p!randomw") {
    fs.readFile(wordPath, 'utf-8', (err, data) => {
      if (err) throw err;
      let words = data.split("\n");
      let word = Math.floor(Math.random() * words.length);
      message.channel.send(words[word]);
    });
  };
});

const questionPath = path.join(__dirname, './data/Questions.txt');
client.on('message', message => {
  if (message.content === "p!randomq") {
    fs.readFile(questionPath, 'utf-8', (err, data) => {
      if (err) throw err;
      let questions = data.split("\n");
      let question = Math.floor(Math.random() * questions.length);
      message.channel.send(questions[question]);
    });
  };
});

client.login(process.env.KEY);
