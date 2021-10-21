const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'reverse',
			aliases: ['invert'],
			group: 'fun',
			memberName: 'reddit',
			ownerOnly: false,
			guildOnly: true,
			description: 'Reverse a given string.',
			args: [
				{
					key: 'text',
					prompt: 'What word do you want to reverse?',
					type: 'string',
				},
			]
		});
	}

	async run(message, { text }) {
		message.channel.send(text.split('').reverse().join(''));
	}
};
