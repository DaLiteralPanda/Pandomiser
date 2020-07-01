const { Client, MessageEmbed, Discord, ClientUser } = require('discord.js');
const client = new Client();
//prefix = ';'

// Runs when Bot is ready
client.on('ready', () => {
  console.log("Bot Online!");

  client.user.setActivity("by Helping :D");
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
  bot_commands = '727206999317676132';
  genral = '727206852923883551';
});
  let genralChannel = client.channels.cache.get(genral);
  let botChannel = client.channels.cache.get(bot_commands);
  //botChannel.send("I am online boiii!");
});

// help command
const help = {
  title: 'Help Command',
  //thumbnail: 'attachment://logo',
  color: '#bbdf32',
  fields: [
    { name: 'Want to generate random words?', value: `;randomw`},
    { name: 'Want to generate some random questions?', value: `;randomq`},
  ],
  //image: 'attachment://logo',
};

client.on('message', message => {
  if (message.content === `;help`) {
    message.channel.send({embed: help});
  };
});

// random word command
client.on('message', message => {
  if (message.content === ";randomw") {
    let words= ['hi', 'bye', 'word', 'panda', 'riadrading', 'whump'];

    let word = Math.floor(Math.random() * words.length);

    message.channel.send(words[word]);
  };
});

client.login("NzI3MjA4MTI4MDcxOTkxMzA3.Xvogtg.uqhxBQXUIhxG3e6sISexzEQO8C4");
