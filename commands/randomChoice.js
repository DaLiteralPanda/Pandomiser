module.exports = {
	name: 'randomChoice',
	description: 'Randomly selects a choice from the given message.',
	execute(message, args) {
        const prefix = 'p!';
        const valueArr = message.toString().replace(`${prefix}randomChoice `, "").split(" ");
        const randomVal = valueArr[Math.floor(Math.random() * valueArr.length)];
        message.channel.send(`${randomVal}, I choose you!`);
	},
};
