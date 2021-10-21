const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'owoify',
			group: 'fun',
			memberName: 'owoify',
			ownerOnly: false,
			guildOnly: true,
			description: 'OwOify a given string.',
			args: [
				{
					key: 'text',
					prompt: 'Type something please.',
					type: 'string'
				}
			]
		})
	}

	async run(message, { text }) {
		let data = await message.client.nekos.sfw.OwOify({ text: text });

		message.channel.send(data.owo);
	}
};
