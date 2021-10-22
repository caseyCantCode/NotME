const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'speeduhc',
			aliases: ['suhc'],
			group: 'hypixel',
			memberName: 'speeduhc',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get Hypixel SpeedUHC (UHC Run) stats of a player',
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
					.setAuthor('SpeedUHC Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(message.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/SpeedUHC-64.png')
					.addField('Kills', `${commaNumber(player.stats.speeduhc.kills)}`, true)
					.addField('Losses', `${commaNumber(player.stats.speeduhc.losses)}`, true)
					.addField('Wins', `${commaNumber(player.stats.speeduhc.wins)}`, true)
					.addField('Winstreak', `${commaNumber(player.stats.speeduhc.winstreak)}`, true)
					.addField('Deaths', `${commaNumber(player.stats.speeduhc.deaths)}`, true)
					.addField('Games Played', `${commaNumber(player.stats.speeduhc.playedGames)}`, true)
					.addField('Coins', `${commaNumber(player.stats.speeduhc.coins)}`, true)
					.addField('KD Ratio', `${player.stats.speeduhc.KDRatio}`, true)
					.addField('WL Ratio', `${player.stats.speeduhc.WLRatio}`, true);

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
