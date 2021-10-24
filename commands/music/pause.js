const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			group: 'music',
			memberName: 'pause',
			ownerOnly: false,
			guildOnly: true,
			description: 'Pauses the queue.',
		});
	}

	async run(message) {
		const queue = message.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel !`);

		if (!queue) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		queue.pause();

		message.channel.send(`${message.client.emotes.success} - Song **${queue.current.title}** paused!`);
	}
};
