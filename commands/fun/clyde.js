const Memer = require('srod-v2');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'clyde',
			group: 'fun',
			memberName: 'clyde',
			ownerOnly: false,
			guildOnly: false,
			description: 'Returns fake Clyde messages.',
			args: [
				{
					key: 'text',
					prompt: 'Type something.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		

		var options = {
			Message: text,
			Color: message.client.config.discord.accentColor,
		};

		const data = await Memer.Clyde(options);

		message.channel.send(data.embed);
	}
};
