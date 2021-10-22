const Discord = require('discord.js');
const fetch = require('node-fetch');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'socialmedia',
			aliases: ['social'],
			group: 'hypixel',
			memberName: 'socialmedia',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get social media of a Hypixel player.',
			args: [
				{
					key: 'player',
					prompt: "Please specify a player's IGN to get the stats from.",
					type: 'string',
				},
			],
		});
	}

	async run(message, { player }) {
		const playerUUID = await fetch(`https://api.mojang.com/users/profiles/minecraft/${player}`);
		const playerUUIDData = await playerUUID.json();

		message.client.hypixelAPIReborn
			.getPlayer(player)
			.then((player) => {
				const embed = new Discord.MessageEmbed()
					.setTimestamp()
					.setAuthor('Social Media', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(message.client.config.discord.accentColor)
					.setThumbnail(`https://crafatar.com/avatars/${playerUUIDData.id}?overlay&size=256`)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

				if (player.socialMedia[0] != undefined || player.socialMedia[0] != null) {
					embed.addField(player.socialMedia[0].name, player.socialMedia[0].link);
				}

				if (player.socialMedia[1] != undefined || player.socialMedia[1] != null) {
					embed.addField(player.socialMedia[1].name, player.socialMedia[1].link);
				}

				if (player.socialMedia[2] != undefined || player.socialMedia[2] != null) {
					embed.addField(player.socialMedia[2].name, player.socialMedia[2].link);
				}

				if (player.socialMedia[3] != undefined || player.socialMedia[3] != null) {
					embed.addField(player.socialMedia[3].name, player.socialMedia[3].link);
				}

				if (player.socialMedia[4] != undefined || player.socialMedia[4] != null) {
					embed.addField(player.socialMedia[4].name, player.socialMedia[4].link);
				}

				if (player.socialMedia[5] != undefined || player.socialMedia[5] != null) {
					embed.addField(player.socialMedia[5].name, player.socialMedia[5].link);
				}

				if (player.socialMedia[6] != undefined || player.socialMedia[6] != null) {
					embed.addField(player.socialMedia[6].name, player.socialMedia[6].link);
				}

				message.channel.send(embed);
			})
			.catch((e) => {
				if (e.message === message.client.HypixelAPIReborn.Errors.PLAYER_DOES_NOT_EXIST) {
					const player404 = new Discord.MessageEmbed()
						.setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
						.setDescription('I could not find that player in the API. Check spelling and name history.')
						.setColor(message.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
					message.channel.send(player404);
				} else {
					if (player) {
						const error = new Discord.MessageEmbed()
							.setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
							.setDescription('An error has occurred')
							.addField('Error', `\`\`\`js\n${e}\n\`\`\``)
							.setColor(message.client.config.discord.accentColor)
							.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
						message.channel.send({ embeds: [error] });
					}
				}
			});
	}
};
