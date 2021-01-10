const fs = require('fs');
const path = require('path');
module.exports = {
	name: 'randomQuote',
	description: 'Generates a Random Quotes',
	execute(message, args) {
		const quotePath = path.join( __dirname, '../data/realQuotes.txt');
		fs.readFile(quotePath, 'utf8', function(err, data) {
			let realQuotes = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
			message.channel.send(realQuotes);
		});
	},
};
