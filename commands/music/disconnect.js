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
		const queue = message.client.player.getQueue(message.guild.id);

		if (!queue.voiceChannel) return message.channel.send(`${message.client.emotes.error} - I'm not connected in any voice channel!`);

		queue.voiceChannel.leave();

		message.channel.send(`${message.client.emotes.success} - I have been **disconnected** from this channel!`);
	}
};
