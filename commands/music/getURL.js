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
		const queue = message.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (queue.voiceChannel && message.member.voice.channel.id !== queue.voiceChannel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!message.client.player.getQueue(message.guild.id)) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		const track = queue.songs[0];

		message.react(message.client.emotes.success);

		message.channel.send(track.url);
	}
};
