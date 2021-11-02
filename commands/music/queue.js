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
			description: 'Shows the guild queue list.',
		});
	}

	async run(message) {
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - You're not in the same voice channel!`);
		
		if (!queue) return message.channel.send(`${this.client.emotes.error} - No songs are currently playing!`);

		message.channel.send(
			`**Guild Queue - ${message.guild.name} ${this.client.emotes.queue} ${this.client.player.getQueue(message.guild.id).repeatMode ? '(looped)' : ''}\n**Current: __${
				queue.songs[0].name
			}__ - by __${queue.songs[0].uploader.name}__\n\n` +
				(queue.songs
					.map((track, i) => {
						return `**#${i + 1}** - __${track.name}__ - by __${track.uploader.name}]__ (Source: ${functions.toTitleCase(track.source)}, Requested by: ${track.user.tag})`;
					})
					.slice(0, 5)
					.join('\n') +
					`\n\n${
						queue.songs.length > 5
							? `And **${queue.songs.length - 5}** other songs (In total of **${queue.songs.length}** songs)...`
							: `Total **${queue.songs.length}** song(s) queued...`
					}`)
		);
	}
};
