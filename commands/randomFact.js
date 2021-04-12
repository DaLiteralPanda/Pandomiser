const fs = require("fs");
const path = require("path");

module.exports = {
    name: "randomFact",
    description: "Generates a random fun fact",
    execute(message, args) {
		const Path = path.join( __dirname, "../data/funFacts.txt");
		fs.readFile(Path, "utf8", function(err, data) {
			let fact = data.split("\n")[Math.floor(Math.random() * data.split("\n").length)]
			message.channel.send(fact);
		})
    }
}