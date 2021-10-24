const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'stop',
			group: 'music',
			memberName: 'stop',
			ownerOnly: false,
			guildOnly: true,
			description: 'Stops music and leaves the voice channel.',
		});
	}

	async run(message) {
		const queue = message.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!queue) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		queue.setRepeatMode(0);

		queue.stop(message);

		message.channel.send(`${message.client.emotes.success} - Music **stopped**!`);
	}
};
