const { Client, MessageEmbed, Discord, ClientUser } = require('discord.js');
const client = new Client();
const fs = require('fs');
const path = require('path');
const prefix = "p!"
const quotePath = __dirname + '/data/quotes.txt';
const questionPath = __dirname + '/data/questions.txt';
const wordPath = __dirname + '/data/words.txt';
const Trello = require("trello")
const trello = new Trello(process.env.Trello_KEY, process.env.Trello_User_KEY);


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
  .setFooter("Made by DaLiteralPanda#9453 | riad#9084 | William_#3483")
  .addField("Thanks for inviting me to your server!", "[Invite link](https://discord.com/api/oauth2/authorize?client_id=727208128071991307&permissions=387136&scope=bot)");

const help = new MessageEmbed()
  .setTitle("Help!")
  .setThumbnail("https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
  .setColor("bbdf32")
  .addField("Want a random word?", `${prefix}randomw`)
  .addField("How about a random question?", `${prefix}randomq`)
  .addField("A random *fake* quote?", `${prefix}randomQuote`)
  .addField("Something you'd like to see added to me?", `${prefix}suggestion [suggestion]`)
  .addField("Want me in your server?", `${prefix}invite`)
  .addField("Want to be in my server?", `${prefix}support`)

client.on('message', message => {
  if (message.content === `${prefix}invite`) {
    message.channel.send(embedInvite);
  };

  if (message.content === `${prefix}help`) {
    message.channel.send(help);
  };

  if (message.content === `${prefix}randomw`) {
    fs.readFile(wordPath, 'utf8', function(err, data) {
      let words = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
      message.channel.send(words)
    })
  };

  if (message.content === `${prefix}randomq`) {
    fs.readFile(questionPath, 'utf8', function(err, data) { 
      let questions = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
      message.channel.send(questions);
    })
  };

  if (message.content === `${prefix}randomQuote`) {
    fs.readFile(quotePath, 'utf8', function(err, data) {
      let markovQuotes = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
      message.channel.send(markovQuotes);
    })
  };
  
  if (message.content === `${prefix}support`) {
    const embed = new MessageEmbed()
      .setURL("https://discord.gg/F4RUHc3")
      .setColor("bbdf32")
      .setAuthor("Pandomiser", "https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
      .setThumbnail("https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
      .setFooter("Made by <@478903410159255572> | <@579013278047535115> | <@579292491606523914>")
      .addField("Join our support server if you think I am acting incorrectly!", "[Invite link](https://discord.gg/F4RUHc3)");
    message.channel.send(embed)
  }

  if(message.content.startsWith(`${prefix}randomRange`)) {
    const args = message.content.replace(`${prefix}randomRange`, "").split(" ").slice(1);

    if(args[0]) {
      let min, max;

	  // There is only one argument
      if(!args[1]) {
        min = 0;
        max = Number(args[0]);
      }
	  // Two arguments
      else {
        min = Number(args[0]);
        max = Number(args[1]);

        // Minimum is actually maximum, so swap
        if(min > max) {
          max = min;
          min = 0;
	    }
      }

      const num = Math.floor(Math.random() * (max - min)) + min;
      message.channel.send(num);
    }
  }

  if (message.content.startsWith(`${prefix}suggestion`)) {
    const suggestion = message.content.replace(`${prefix}suggestion `, "");
    if (suggestion === "") {
      message.reply("You did not give a valid suggestion, please do `p!suggestion [suggestion].");
      message.channel.send("Please contact one of the staff members of this bot if you do not think this is correct.")
    }
    client.channels.cache.get("730476984194433163").send(`"${suggestion}" - <@${message.author.id}>`).then(msg => {
      msg.react("✅");
      msg.react("❎")
    });
  }
});

client.on('messageReactionAdd', async message => {
  const filter = async (reaction, user) => {
    return ['<:approved:740647440063004793>'].includes(reaction.emoji.name) && user.id !== client.user.id;
  }
  message.awaitReactions(filter, { max: 1 })
    .then(async collected => {
      if (collected.first().author.id !== "579292491606523914" || collected.first().author.id !== "579013278047535115" || collected.first().author.id !== "478903410159255572" && message.channel.id !== "730476984194433163") return false;
      trello.addCard(message.content, function(err) {if (err) console.log(err)})
    })
})
