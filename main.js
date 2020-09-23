const fs = require('fs');
const path = require('path');
const { Client, MessageEmbed, Discord, ClientUser, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const prefix = "p!";
const Trello = require("trello")
const trello = new Trello(process.env.Trello_KEY, process.env.Trello_User_KEY);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Login
client.login(process.env.KEY);

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

// Help embed
const help = new MessageEmbed()
  .setTitle("Help!")
  .setThumbnail("https://media.discordapp.net/attachments/731529488671703142/731538158403059792/improved_logo.jpg")
  .setColor("bbdf32")
  .addField("Want a random word?", `${prefix}randomw`)
  .addField("How about a random question?", `${prefix}randomq`)
  .addField("A random *fake* quote?", `${prefix}randomQuote`)
  .addField("Want a random number from a range of numbers?", `${prefix}randomRange`)
  .addField("Something you'd like to see added to me?", `${prefix}suggestion [suggestion]`)
  .addField("Want me in your server?", `${prefix}invite`)
  .addField("Want to be in my server?", `${prefix}support`)

client.on('message', message => {

  // Command Loader
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

  // Invite command
  if (message.content === `${prefix}invite`) {
    message.channel.send(embedInvite);
  };
  // Help command
  if (message.content === `${prefix}help`) {
    message.channel.send(help);
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
    });
});
