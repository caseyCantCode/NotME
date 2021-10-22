const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'reverse',
			aliases: ['invert'],
			group: 'fun',
			memberName: 'reverse',
			ownerOnly: false,
			guildOnly: false,
			description: 'Reverse a given string.',
			args: [
				{
					key: 'text',
					prompt: 'What word do you want to reverse?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		message.channel.send(text.split('').reverse().join(''));
	}
};
