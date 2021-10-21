const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'shuffle',
			group: 'music',
			memberName: 'shuffle',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shuffle song positions of a queue.'
		});
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!message.client.player.getQueue(message.guild)) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		const queue = message.client.player.getQueue(message.guild);

		const success = queue.shuffle();

		if (success) message.channel.send(`${message.client.emotes.success} - Queue shuffled **${message.client.player.getQueue(message.guild).tracks.length}** song(s)!`);
	}
};
