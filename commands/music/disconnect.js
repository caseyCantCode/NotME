const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'disconnect',
			aliases: ['dis'],
			group: 'music',
			memberName: 'disconnect',
			ownerOnly: false,
			guildOnly: true,
			description: 'Disconnects from current voice channel.',
		});
	}

	async run(message) {
		if (!message.guild.me.voice.channel) return message.channel.send(`${message.client.emotes.error} - I'm not connected in any voice channel!`);

		message.guild.me.voice.channel.leave();

		message.channel.send(`${message.client.emotes.success} - I have been **disconnected** from this channel!`);
	}
};
