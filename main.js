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
    const invite = {
    color: "#bbdf32",
    author: {
    name: 'Pandomiser',
    icon_url: 'https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg',
    },
    thumbnail: {
    url: 'https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg',
    },
    fields: [{
    name: 'Thanks for inviting our bot to your server!',
    value: `[Invite link](https://discord.com/api/oauth2/authorize?client_id=727208128071991307&permissions=313408&scope=bot)`,
    }],  
    footer: {
    text: 'Made by riad#9084 | DaLiteralPanda#9453',
    },
    };

client.on('message', message => {
  if (message.content === `p!invite`) {
    message.channel.send({embed: invite});
  };
});
// help command
const help = {
  title: 'Help Command',
  thumbnail: { url: 'https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg'},
  color: '#bbdf32',
  fields: [
    { name: 'Want to generate random words?', value: `p!randomw`},
    { name: 'Want to generate some random questions?', value: `p!randomq`},
  ],
  image: { url'https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg'},
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
