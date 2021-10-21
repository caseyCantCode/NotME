const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'clearqueue',
			aliases: ['cq'],
			group: 'music',
			memberName: 'clearqueue',
			ownerOnly: false,
			guildOnly: true,
			description: 'Clears existing queues.',
		});
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!message.client.player.getQueue(message.guild)) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		if (message.client.player.getQueue(message.guild).tracks.length <= 1) return message.channel.send(`${message.client.emotes.error} - There is only one song in the queue.`);

		const queue = message.client.player.getQueue(message.guild);

		queue.destroy();

		message.channel.send(`${message.client.emotes.success} - The queue has just been **removed**!`);
	}
};
