const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'resume',

			group: 'music',
			memberName: 'resume',
			ownerOnly: false,
			guildOnly: true,
			description: 'Resume the paused queue.'
		});
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel !`);

		if (!message.client.player.getQueue(message.guild)) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		const queue = message.client.player.getQueue(message.guild);

		queue.setPaused(false);

		message.channel.send(`${message.client.emotes.success} - Song **${queue.current.title}** resumed!`);
	}
};
