const { MessageEmbed } = require('discord.js');
const functions = require('../../utils/functions.js');
const Genius = require('genius-lyrics');
const Client = new Genius.Client();
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'lyrics',
			aliases: ['lrs'],
			group: 'info',
			memberName: 'lyrics',
			ownerOnly: false,
			guildOnly: true,
			description: 'Find a specific song\'s lyrics.',
			args: [
				{
					key: 'query',
					prompt: 'which song would you like to search?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { query }) {
		const searches = await Client.songs.search(query).catch((err) => {
			return message.channel.send(`${message.client.emotes.error} - **ERROR**\`\`\`js\n${err}\n\`\`\``);
		});

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setTitle(`Choose a song to fetch lyrics`)
			.setFooter("Type the specified song's position in the chat or type 'cancel' to cancel")
			.setTimestamp()
			.setDescription(
				`${searches
					.map((t, i) => `**#${i + 1}** - __${t.title}__ - by **${t.artist.name}**`)
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
			.then(async (collected) => {
				const result = collected.first();

				if (result.content === '1') {
					result.react(message.client.emotes.success);
					msg.delete();
					const lyrics = await searches[0].lyrics();

					const embed1 = new MessageEmbed()
						.setColor(message.client.config.discord.accentColor)
						.setTitle(`${functions.toTitleCase(searches[0].title)} - ${searches[0].artist.name}`)
						.setDescription(lyrics)
						.setThumbnail(searches[0].thumbnail)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.setTimestamp();

					return message.channel.send({ embeds: [embed1] });
				} else if (result.content === '2') {
					result.react(message.client.emotes.success);
					msg.delete();
					const lyrics = await searches[1].lyrics();

					const embed1 = new MessageEmbed()
						.setColor(message.client.config.discord.accentColor)
						.setTitle(`${functions.toTitleCase(searches[1].title)} - ${searches[1].artist.name}`)
						.setDescription(lyrics)
						.setThumbnail(searches[1].thumbnail)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.setTimestamp();

					return message.channel.send({ embeds: [embed1] });
				} else if (result.content === '3') {
					result.react(message.client.emotes.success);
					msg.delete();
					const lyrics = await searches[2].lyrics();

					const embed1 = new MessageEmbed()
						.setColor(message.client.config.discord.accentColor)
						.setTitle(`${functions.toTitleCase(searches[2].title)} - ${searches[2].artist.name}`)
						.setDescription(lyrics)
						.setThumbnail(searches[2].thumbnail)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.setTimestamp();

					return message.channel.send({ embeds: [embed1] });
				} else if (result.content === '4') {
					result.react(message.client.emotes.success);
					msg.delete();
					const lyrics = await searches[3].lyrics();

					const embed1 = new MessageEmbed()
						.setColor(message.client.config.discord.accentColor)
						.setTitle(`${functions.toTitleCase(searches[3].title)} - ${searches[3].artist.name}`)
						.setDescription(lyrics)
						.setThumbnail(searches[3].thumbnail)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.setTimestamp();

					return message.channel.send({ embeds: [embed1] });
				} else if (result.content === '5') {
					result.react(message.client.emotes.success);
					msg.delete();
					const lyrics = await searches[4].lyrics();

					const embed1 = new MessageEmbed()
						.setColor(message.client.config.discord.accentColor)
						.setTitle(`${functions.toTitleCase(searches[4].title)} - ${searches[4].artist.name}`)
						.setDescription(lyrics)
						.setThumbnail(searches[4].thumbnail)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.setTimestamp();

					return message.channel.send({ embeds: [embed1] });
				} else if (result.content === 'cancel') {
					result.react(message.client.emotes.success);
					msg.delete();
					return message.channel.send(`${message.client.emotes.success} - Search **cancelled**!`);
				} else {
					msg.delete();
					return message.channel.send(`${message.client.emotes.error} - Invalid position!`);
				}
			})
			.catch((err) => {
				msg.delete();
				return message.channel.send(`${message.client.emotes.error} - **ERROR**\n\`\`\`js\n${err}\n\`\`\``);
			});
	}
};
