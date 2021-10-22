const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['p'],
			group: 'music',
			memberName: 'play',
			ownerOnly: false,
			guildOnly: true,
			description: 'Plays a song.',
			args: [
				{
					key: 'query',
					prompt: 'which song do you want to play?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { query }) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		const queue = message.client.player.createQueue(message.guild, {
			metadata: {
				channel: message.channel,
				message: message,
			},
		});

		try {
			if (!queue.connection) await queue.connect(message.member.voice.channel);
		} catch (err) {
			queue.destroy();
			console.error(err);
			return message.channel.send(`${message.client.emotes.error} - Could not join your voice channel!`);
		}

		const song = await message.client.player.search(query.replace(/^\<+|\>+$/g, ''), {
			requestedBy: message.author,
		});

		console.log(query.replace(/^\<+|\>+$/g, ''));

		if (query.includes('http')) {
			if (song.playlist) {
				queue.addTracks(song.playlist.tracks);
			} else {
				queue.addTrack(song.tracks[0]);
			}
		} else {
			message.channel.send(message.client.emotes.music + ' - Searching `' + args.join(' ') + '` on YouTube...');

			const embed = new MessageEmbed()
				.setColor(message.client.config.discord.accentColor)
				.setTitle(`Choose a song to play`)
				.setFooter("Type the specified song's position in the chat or type 'cancel' to cancel")
				.setTimestamp()
				.setDescription(
					`${song.tracks
						.map((t, i) => `**#${i + 1}** - __${t.title}__ - by **${t.author}**`)
						.slice(0, 5)
						.join('\n')}`
				);

			let msg = await message.channel.send(embed);

			/*
				const num1 = '1️⃣';
				const num2 = '2️⃣';
				const num3 = '3️⃣';
				const num4 = '4️⃣';
				const num5 = '5️⃣';

				msg.react(num1)
					.then(() => msg.react(num2))
					.then(() => msg.react(num3))
					.then(() => msg.react(num4))
					.then(() => msg.react(num5))

				
				const filter = (reaction, user) => {
					return [num1, num2, num3, num4, num5].includes(result.content.toLowerCase()) && user.id === message.author.id;
				};
				*/

			const filter = (response) => {
				return ['1', '2', '3', '4', '5', 'cancel'].some((answer) => answer.toLowerCase() === response.content.toLowerCase());
			};

			await msg.channel
				.awaitMessages({
					filter,
					max: 1,
					time: 30000,
					errors: ['time'],
				})
				.then((collected) => {
					const result = collected.first();

					if (result.content === '1') {
						result.react(message.client.emotes.success);
						queue.addTrack(song.tracks[0]);
					} else if (result.content === '2') {
						result.react(message.client.emotes.success);
						queue.addTrack(song.tracks[1]);
					} else if (result.content === '3') {
						result.react(message.client.emotes.success);
						queue.addTrack(song.tracks[2]);
					} else if (result.content === '4') {
						result.react(message.client.emotes.success);
						queue.addTrack(song.tracks[3]);
					} else if (result.content === '5') {
						result.react(message.client.emotes.success);
						queue.addTrack(song.tracks[4]);
					} else if (result.content === 'cancel') {
						result.react(message.client.emotes.success);
						return message.channel.send(`${message.client.emotes.success} - Search **cancelled**!`);
					} else {
						return message.channel.send(`${message.client.emotes.error} - Invalid position!`);
					}
				})
				.catch(() => {
					msg.delete();
					return message.channel.send(`${message.client.emotes.error} - Timed out!`);
				});
		}

		try {
			queue.play();
		} catch {
			console.log(console.error);
		}
	}
};
