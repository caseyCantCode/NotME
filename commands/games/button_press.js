const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'will-you-press-the-button',
			aliases: ['wyptb', 'button-press'],
			group: 'games',
			memberName: 'will-you-press-the-button',
			ownerOnly: false,
			guildOnly: true,
			description: 'Will you press the button?',
		});
	}

	async run(message) {
		await this.client.weky.WillYouPressTheButton({
			message: message,
			embed: {
				title: 'Will you press the button?',
				description: '```{{statement1}}```\n**but**\n\n```{{statement2}}```',
				color: this.client.config.discord.accentColor,
				footer: 'just a game',
				timestamp: true,
			},
			button: { yes: 'Yes', no: 'No' },
			thinkMessage: "I'm thinking",
			othersMessage: 'Only <@{{author}}> can use the buttons!',
		});
	}
};
