require("dotenv").config();
const tmi = require('tmi.js');
const { ApiClient } = require('twitch');
const {Comtroller} = require('comtroller');
const commands = require("./commands");
const Context = require("./context");

const comtroller = new Comtroller({
	commands,
	defaults: {
		prefix: '!'
	}
})

const pubSubClient = new PubSubClient();
const userId = await pubSubClient.registerUserListener(apiClient);

const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.BOT_PASSWORD
	},
	channels: [ 'xjabee' ]
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	const context = new Context(client, channel, tags, message);
	comtroller.run(message, {context});
});






