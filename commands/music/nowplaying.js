const { MessageEmbed } = require('discord.js');
const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');

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
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!message.client.player.getQueue(message.guild)) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		const queue = message.client.player.getQueue(message.guild);

		const track = queue.nowPlaying();

		let repeat_mode = '';

		console.log(track.title);
		console.log(track.author);
		console.log(track.requestedBy.username);
		console.log(track.fromPlaylist);
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
		} else if (queue.repeatMode === 3) {
			repeat_mode = 'Auto-play';
		} else {
			repeat_mode = 'Off';
		}

		const embed = new MessageEmbed()
			.setAuthor('Now playing', message.author.displayAvatarURL({ dynamic: true }))
			.setColor(message.client.config.discord.accentColor)
			.setTitle(`**${track.title}**`)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setThumbnail(track.thumbnail)
			.addFields(
				{ name: 'Source', value: functions.toTitleCase(track.source), inline: true },

				{ name: 'Requested by', value: track.requestedBy.tag, inline: true },
				{ name: 'Channel', value: track.author, inline: true },

				{ name: 'Views', value: functions.numberWithCommas(track.views), inline: true },
				{ name: 'Duration', value: '`' + track.duration + '`', inline: true },

				{ name: 'Volume', value: queue.volume.toString(), inline: true },
				{ name: 'Looping mode', value: repeat_mode, inline: true },

				{ name: 'Progress', value: queue.createProgressBar(), inline: false }
			);

		message.channel.send(embed);
	}
};
