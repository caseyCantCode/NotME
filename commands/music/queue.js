const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'queue',
			aliases: ['q'],
			group: 'music',
			memberName: 'queue',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shows the guild queue list.'
		});
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		const queue = message.client.player.getQueue(message.guild);

		if (!message.client.player.getQueue(message.guild)) return message.channel.send(`${message.client.emotes.error} - No songs are currently playing!`);

		message.channel.send(
			`**Guild Queue - ${message.guild.name} ${message.client.emotes.queue} ${message.client.player.getQueue(message.guild).repeatMode ? '(looped)' : ''}\n**Current: __${queue.current.title}__ - by **${
				queue.current.author
			}**\n\n` +
				(queue.tracks
					.map((track, i) => {
						return `**#${i + 1}** - __${track.title}__ - by **${track.author}** (Source: ${functions.toTitleCase(track.source)}, Requested by: ${track.requestedBy.tag})`;
					})
					.slice(0, 5)
					.join('\n') +
					`\n\n${
						queue.tracks.length > 5
							? `And **${queue.tracks.length - 5}** other songs (In total of **${queue.tracks.length}** songs)...`
							: `Total **${queue.tracks.length}** song(s) queued...`
					}`)
		);
	}
};
