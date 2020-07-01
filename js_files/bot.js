const { Client, MessageEmbed, Discord, ClientUser } = require('discord.js');
const client = new Client();
//prefix = ';'

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

client.on('message', message => {
  if (message.content === `;help`) {
    // We can create embeds using the MessageEmbed constructor
    const help = new MessageEmbed()
      // Set the title of the field
      .setTitle('Help Command')
      // Set the color of the embed
      .setColor('#bbdf32')
      // Set the main content of the embed
      .addFields(
        { name: 'Want to generate random words?', value: `;randomw`},
        { name: 'Want to generate some random questions?', value: `;randomq`},
      )
    message.channel.send(help);
  }
});

client.login("NzI3MjA4MTI4MDcxOTkxMzA3.Xvogtg.uqhxBQXUIhxG3e6sISexzEQO8C4");
