const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'geturl',
			aliases: ['url'],
			group: 'music',
			memberName: 'geturl',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get the URL of a playing song.',
		});
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!message.client.player.getQueue(message.guild.id)) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		const queue = message.client.player.getQueue(message.guild.id);

		const track = queue.songs[0];

		message.react(message.client.emotes.success);

		message.channel.send(track.url);
	}
};