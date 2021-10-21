const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'uhc',

			group: 'hypixel',
			memberName: 'uhc',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get Hypixel UHC stats of a player',
			args: [
				{
					key: 'player',
					prompt: 'Please specify a player\'s IGN to get the stats from.',
					type: 'string'
				}
			]
		})
	}

	async run(message, { player }) {
		message.client.hypixelAPIReborn
			.getPlayer(player)
			.then((player) => {
				const embed = new Discord.MessageEmbed()
					.setTimestamp()
					.setAuthor('UHC Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(message.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/UHC-64.png')
					.addField('Kills', `${commaNumber(player.stats.uhc.kills)}`, true)
					.addField('Level', `${player.stats.uhc.starLevel}`, true)
					.addField('Wins', `${commaNumber(player.stats.uhc.wins)}`, true)
					.addField('Heads Eaten', `${commaNumber(player.stats.uhc.headsEaten)}`, true)
					.addField('Deaths', `${commaNumber(player.stats.uhc.deaths)}`, true)
					.addField('Coins', `${commaNumber(player.stats.uhc.coins)}`, true);

				message.channel.send({ embeds: [embed] });
			})
			.catch((e) => {
				if (e.message === message.client.HypixelAPIReborn.Errors.PLAYER_DOES_NOT_EXIST) {
					const player404 = new Discord.MessageEmbed()
						.setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
						.setDescription('I could not find that player in the API. Check spelling and name history.')
						.setColor(message.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
					message.channel.send({ embeds: [player404] });
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
