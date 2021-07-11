require("dotenv").config();
require("./eventhandler");
const client = require("./tmiclient")
const { Comtroller } = require('comtroller');
const { Cooldowns } = require("comtroller");
const commands = require("./commands");
const Context = require("./context");

const comtroller = new Comtroller({
	commands,
	defaults: {
		prefix: '!'
	}
})



client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
	if (self) return;
	const context = new Context(client, channel, tags, message);
	comtroller.run(message, { context });
});





