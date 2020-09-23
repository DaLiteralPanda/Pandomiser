const fs = require('fs');
const path = require('path');
module.exports = {
	name: 'randomQuote',
	description: 'Generates Random fake Quotes',
	execute(message, args) {
		const quotePath = path.join( __dirname, '../data/quotes.txt');
    fs.readFile(quotePath, 'utf8', function(err, data) {
      let markovQuotes = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
      message.channel.send(markovQuotes);
    });
	},
};
