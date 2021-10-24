const { MessageEmbed } = require('discord.js');
const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');
const progressbar = require('string-progressbar');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'nowplaying',
			aliases: ['np'],
			group: 'music',
			memberName: 'nowplaying',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shows playing stats of a song as an embed.',
		});
	}

	async run(message) {
		const queue = message.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!queue) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		const track = queue.songs[0];

		let repeat_mode = '';

		console.log(track.name);
		console.log(track.uploader);
		console.log(track.user.username);
		console.log(track.views);
		console.log(track.duration);
		console.log(queue.volume);
		console.log(queue.repeatMode);

		if (queue.repeatMode === 0) {
			repeat_mode = 'Off';
		} else if (queue.repeatMode === 1) {
			repeat_mode = 'Track';
		} else if (queue.repeatMode === 2) {
			repeat_mode = 'Queue';
		}

		if (queue.autoplay === true) {
			repeat_mode = 'Auto-play';
		} else {
			repeat_mode = 'Off';
		}

		function createProgressBar(options = { timecodes: true }) {
			var length = typeof options.length === 'number' ? (options.length <= 0 || options.length === Infinity ? 15 : options.length) : 15;

			const index = Math.round((queue.currentTime / track.duration * 1000) * length);
			const indicator = typeof options.indicator === 'string' && options.indicator.length > 0 ? options.indicator : '🔘';
			const line = typeof options.line === 'string' && options.line.length > 0 ? options.line : '▬';

			if (index >= 1 && index <= length) {
				const bar = line.repeat(length - 1).split('');
				bar.splice(index, 0, indicator);
				if (options.timecodes) {
					const current = queue.formattedCurrentTime;
					const end = track.formattedDuration;
					return `${current} ┃ ${bar.join('')} ┃ ${end}`;
				} else {
					return `${bar.join('')}`;
				}
			} else {
				if (options.timecodes) {
					const current = queue.formattedCurrentTime;
					const end = track.formattedDuration;
					return `${current} ┃ ${indicator}${line.repeat(length - 1)} ┃ ${end}`;
				} else {
					return `${indicator}${line.repeat(length - 1)}`;
				}
			}
		}

		const embed = new MessageEmbed()
			.setAuthor('Now playing', message.client.user.displayAvatarURL())
			.setColor(message.client.config.discord.accentColor)
			.setTitle(`**${track.name}**`)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setThumbnail(track.thumbnail)
			.addFields(
				{ name: 'Source', value: functions.toTitleCase(track.source), inline: true },

				{ name: 'Requested by', value: track.user.tag, inline: true },
				{ name: 'Channel', value: `[${track.uploader.name}](${track.uploader.url})`, inline: true },

				{ name: 'Views', value: functions.numberWithCommas(track.views), inline: true },
				{ name: 'Duration', value: '`' + track.formattedDuration + '`', inline: true },

				{ name: 'Volume', value: queue.volume.toString(), inline: true },
				{ name: 'Looping mode', value: repeat_mode, inline: true },

				{ name: 'Progress', value: createProgressBar(), inline: false }
			);

		message.channel.send(embed);
	}
};
