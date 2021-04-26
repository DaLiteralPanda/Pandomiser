const fs = require('fs');
const path = require('path');
const cron = require("node-cron");
const { Client, MessageEmbed, Discord, ClientUser, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const prefix = "p!";
const QOTDservers = require("./data/automatedQOTD.json")["servers"]
const Trello = require("trello")
//const trello = new Trello(process.env.Trello_KEY, process.env.Trello_User_KEY);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name.toLowerCase(), command);
}

// Login
require('dotenv').config();
const token = process.env.KEY;
client.login(token);

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

// Invite embed
const embedInvite = new MessageEmbed()
  .setURL("https://discord.com/api/oauth2/authorize?client_id=727208128071991307&permissions=387136&scope=bot")
  .setColor("bbdf32")
  .setAuthor("Pandomiser", "https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
  .setThumbnail("https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
  .setFooter("Made by DaLiteralPanda#9453 | riad#9084 | William_#3483")
  .addField("Thanks for inviting me to your server!", "[Invite link](https://discord.com/api/oauth2/authorize?client_id=727208128071991307&permissions=387136&scope=bot)");

client.on('message', async (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  // Invite command
  if (message.content === `${prefix}invite`) {
    message.channel.send(embedInvite);
  };
  // Help command
  if (message.content === `${prefix}help`) {
    const help = new MessageEmbed()
      .setTitle("Help!")
      .setThumbnail("https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
      .setColor("bbdf32")
    for (let i=0;i<commandFiles.length;i++) {
      const currentFile = require(`./commands/${commandFiles[i]}`)
      help.addField(prefix + currentFile.name, currentFile.description)
    }
    message.channel.send(help).catch((err) => console.log(err))
  };

// Suggestion command
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
  message.channel.send("Suggestion has been sent, thanks!")
  }

  if (message.content === `${prefix}review`) {
    let i = 1;
    if (message.author.bot) return;
    const questions = require("./data/reviewQuestions.json")["questions"];
    const filter = m => m.author === message.author;
    let answers = []
    const m = await message.author.send(`The review has started. You can cancel at any time. Your review answers will be sent to our support server, you can see your server by joining it! There are ${questions.length} questions. Thanks in advance for your review!`).catch(() => {
        return message.reply("I can't DM you! Please give me the permission to message you!");
    }).then(() => message.author.send(questions[0]))
    const collector = m.channel.createMessageCollector(filter, { max: questions.length });

    collector.on("collect", (response) => {
        if (response.content === "cancel") return response.reply("Alright, I have cancelled the process. Come back when you're ready!");
        answers.push(response.content);
        if (i == questions.length) {
            response.channel.send("You finished the review questions. Thanks!");
        } else {
            response.channel.send(questions[i]);
            i++
        }
    })

    collector.on("end", (collected) => {
      const embed = new MessageEmbed()
          .setAuthor(`${message.author.tag} wrote a very touching review!`)
          .setColor("bbdf32")
          .setThumbnail("https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
      for (let j=0;j<questions.length;j++) {
          embed.addField(questions[j], answers[j])
      }
      client.channels.cache.get("831248661781807154").send(embed)
    })
  }

  // Command Loader
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  };
});


client.on('messageReactionAdd', async message => {
  const filter = async (reaction, user) => {
    return ['<:approved:740647440063004793>'].includes(reaction.emoji.name) && user.id !== client.user.id;
  }
  message.awaitReactions(filter, { max: 1 })
    .then(async collected => {
      if (collected.first().author.id !== "579292491606523914" || collected.first().author.id !== "579013278047535115" || collected.first().author.id !== "478903410159255572" && message.channel.id !== "730476984194433163") return false;
      trello.addCard(message.content, function(err) {if (err) console.log(err)})
    });
});

cron.schedule("0 0 0 * * *", async () => {
  for (let i=0;i<QOTDservers.length;i++) {
    fs.readFile("./data/questions.txt", 'utf8', async (err, data) => {
			var randomQuestion = await data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
      client.channels.cache.get(QOTDservers[i]).send(randomQuestion)
		})
  }
})