const db = require('quick.db');

const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'chatbot',
			group: 'util',
			memberName: 'chatbot',
			ownerOnly: false,
			guildOnly: true,
			description: 'Use the chatbot feature.',
			args: [
				{
					key: 'channel',
					prompt: 'Please specify the text channel.',
					type: 'textChannel',
					default: ''
				},
			],
			userPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(message, { channel }) {
		if (!channel) {
			db.set(`${message.guild.id}.chatbotChannel`, '');
			return message.channel.send(`${message.client.emotes.success} - Chatbot feature has been turned off.`);
		}

		db.set(`${message.guild.id}.chatbotChannel`, `${channel.id}`);

		return message.channel.send(`${message.client.emotes.success} - Successfully set the chatbot channel to ${channel.toString()}!`);
	}
};
