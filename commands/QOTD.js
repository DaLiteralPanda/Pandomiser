const fs = require('fs');
const path = require('path');

module.exports = {
	name: 'QOTD',
	description: 'The command to toggle an automated QOTD in your server, use this in the channel you want to gave the questions sent to daily.',
	async execute(message, args) {
        try {
            if (message.guild === null) return message.channel.send("Please use this command in a server!")
            const oldJSON = require("../data/automatedQOTD.json")
            if (oldJSON["servers"].includes(message.channel.id)) {
                var newJSON = oldJSON["servers"]
                newJSON.splice(oldJSON["servers"].indexOf(message.channel.id), 1)
                message.channel.send("This channel has been removed from the QOTD list!")
            } else {
                var newJSON = oldJSON["servers"]
                newJSON.push(message.channel.id)
                message.channel.send("You are now subscribed to the Question of the Day messaging list!")
            }
            const writeableJSON = {"servers": newJSON}
            await fs.writeFile("./data/automatedQOTD.json", JSON.stringify(writeableJSON), (err) => console.log(err))
            console.log("aaa")
        } catch (err) {
            console.log(err)
        }
    }
}