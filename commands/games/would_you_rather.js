const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'would-you-rather',
			aliases: ['wyr'],
			group: 'games',
			memberName: 'would-you-rather',
			ownerOnly: false,
			guildOnly: true,
			description: 'Would you rather...',
		});
	}

	async run(message) {
		await message.client.weky.WouldYouRather({
			message: message,
			embed: {
				title: 'Would you rather...',
				color: message.client.config.discord.accentColor,
				footer: 'reeeee',
				timestamp: true,
			},
			thinkMessage: "I'm thinking...",
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			buttons: { optionA: 'Option A', optionB: 'Option B' },
		});
	}
};
