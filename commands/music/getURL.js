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
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - You're not in the same voice channel!`);

		if (!queue) return message.channel.send(`${this.client.emotes.error} - No music is currently playing!`);

		const track = queue.songs[0];

		message.react(this.client.emotes.success);

		message.channel.send(track.url);
	}
};
