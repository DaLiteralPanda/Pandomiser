const fs = require('fs');
const path = require('path');
module.exports = {
	name: 'randomq',
	description: 'Generates Random Questions',
	execute(message, args) {
	const questionPath = path.join( __dirname, '../data/questions.txt');
    fs.readFile(questionPath, 'utf8', function(err, data) {
      let questions = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
      message.channel.send(questions);
    })
	},
};
