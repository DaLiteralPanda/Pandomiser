const { Client, MessageEmbed, Discord, ClientUser } = require('discord.js');
const client = new Client();
//prefix = 'p!'

// Runs when Bot is ready
client.on('ready', () => {
  console.log("Bot Online!");

  client.user.setActivity("p!help");
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
});
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

// File Paths
const fs = require('fs'),
    path = require('path'),
    wordPath = path.join(__dirname, './data/words.txt');
    quesPath = path.join(__dirname, './data/Questions.txt');

// Random Word Generator
client.on('message', message => {
  if (message.content === "p!randomw") {
    fs.readFile(wordPath, 'utf-8', (err, data) => {
      if (err) throw err;
      //
      let words = data.split("\n");
      let word = Math.floor(Math.random() * words.length);
      message.channel.send(words[word]);
    });
  };
});

// Random Question Generator
client.on('message', message => {
  if (message.content === "p!randomq") {
    fs.readFile(quesPath, 'utf-8', (err, data) => {
      if (err) throw err;
      //
      let questions = data.split("\n");
      let question = Math.floor(Math.random() * questions.length);
      message.channel.send(questions[question]);
    });
  };
});

client.login(process.env.TOKEN);
