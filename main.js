const { Client, MessageEmbed, Discord, ClientUser } = require('discord.js');
const client = new Client();
const fs = require('fs');
const path = require('path');
const prefix = 'p!';

// Runs when Bot is ready
client.on('ready', () => {
  console.log("Bot Online!");

  client.user.setActivity("p!help");
});

Client.on("message", async message => {
  if (!message.content.startsWith(prefix)) return;

  if (message.channel.type !== "text") return;

  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
});

//invite command
if(command === "invite"){
    let embed = new Discord.MessageEmbed()
    .setColor('#bbdf32')
    .setThumbnail('https://cdn.discordapp.com/attachments/731529488671703142/731538158403059792/improved_logo.jpg')
    .setAuthor('Pandomiser', 'https://cdn.discordapp.com/attachments/731529488671703142/731538158403059792/improved_logo.jpg')
    .addField("Thanks For Adding Me To Your Server","[My Invite Link](https://discordapp.com/oauth2/authorize?client_id=724885507263168602&scope=bot&permissions=8208)")
    .setFooter('Made By riad#9084 | DaLiteralPanda#9453')
    message.channel.send(embed)
};
// help command

  if(command === "help"){
    let embed = new Discord.MessageEmbed()
    .setTitle("Help Commmand")
    .setThumbnail("https://cdn.discordapp.com/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
    .setColor("#bbdf32")
    .addField("Want to generate random words?","p!randomw")
    .addField("Want to generate random words?","p!randomw")
    message.channel.send(embed)
};
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

//random question/topic generator

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
});
client.login(process.env.KEY);
