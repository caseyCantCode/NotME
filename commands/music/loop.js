const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'loop',
			aliases: ['lp', 'repeat'],
			group: 'music',
			memberName: 'loop',
			ownerOnly: false,
			guildOnly: true,
			description: 'Toggle between loop modes.',
			args: [
				{
					key: 'loopmode',
					prompt: 'Which mode do you want to choose? Available modes are **track** and **queue**.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { loopmode }) {
		const queue = message.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (queue.voiceChannel && message.member.voice.channel.id !== queue.voiceChannel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!queue) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		if (loopmode.toLowerCase() === 'queue') {
			if (queue.repeatMode) {
				queue.setRepeatMode(0);
				return message.channel.send(`${message.client.emotes.success} - Queue repeat mode **disabled**!`);
			} else {
				queue.setRepeatMode(2);
				return message.channel.send(`${message.client.emotes.success} - Queue repeat mode **enabled**!`);
			}
		} else if (loopmode.toLowerCase() === 'track') {
			if (queue.repeatMode) {
				queue.setRepeatMode(0);
				return message.channel.send(`${message.client.emotes.success} - Track repeat mode **disabled**!`);
			} else {
				queue.setRepeatMode(1);
				return message.channel.send(`${message.client.emotes.success} - Track repeat mode **enabled**!`);
			}
		} else if (loopmode.toLowerCase() === 'off') {
			if (queue.repeatMode == 1) {
				queue.setRepeatMode(0);
				return message.channel.send(`${message.client.emotes.success} - Track repeat mode **disabled**!`);
			}
			if (queue.repeatMode == 2) {
				queue.setRepeatMode(0);
				return message.channel.send(`${message.client.emotes.success} - Queue repeat mode **disabled**!`);
			}

			queue.setRepeatMode(0);
			return message.channel.send(`${message.client.emotes.success} - Repeat mode **disabled**!`);
		}
	}
};
