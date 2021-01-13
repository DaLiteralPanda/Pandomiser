const fs = require('fs');
const path = require('path');
module.exports = {
	name: 'randomw',
	description: 'Generates Random Words',
	execute(message, args) {
		const wordPath = path.join( __dirname, '../data/words.txt');
		fs.readFile(wordPath, 'utf8', function(err, data) {
      let words = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
      message.channel.send(words)
    })
	},
};
