const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'skywars',
			aliases: ['sw'],
			group: 'hypixel',
			memberName: 'skywars',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get Hypixel Skywars stats of a player',
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
					.setAuthor('Skywars Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setColor(message.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/Skywars-64.png')
					.addField('Level', `${player.stats.skywars.level}`, true)
					.addField('Heads', `${commaNumber(player.stats.skywars.heads)}`, true)
					.addField('KD Ratio', `${player.stats.skywars.KDRatio}`, true)
					.addField('WL Ratio', `${player.stats.skywars.WLRatio}`, true)
					.addField('Coins', `${commaNumber(player.stats.skywars.coins)}`, true)
					.addField('Total Deaths', `${commaNumber(player.stats.skywars.deaths)}`, true)
					.addField('Total Kills', `${commaNumber(player.stats.skywars.kills)}`, true)
					.addField('Winstreak', `${commaNumber(player.stats.skywars.winstreak)}`, true)
					.addField('Total Wins', `${commaNumber(player.stats.skywars.wins)}`, true)
					.addField('Tokens', `${commaNumber(player.stats.skywars.tokens)}`, true)
					.addField('Prestige', `${player.stats.skywars.prestige}`, true)
					.addField('Souls', `${commaNumber(player.stats.skywars.souls)}`, true)
					.addField('Ranked Kills', `${commaNumber(player.stats.skywars.ranked.kills)}`, true)
					.addField('Ranked Losses', `${commaNumber(player.stats.skywars.ranked.losses)}`, true)
					.addField('Ranked Games Played', `${commaNumber(player.stats.skywars.ranked.played)}`, true)
					.addField('Ranked Wins', `${commaNumber(player.stats.skywars.ranked.wins)}`, true)
					.addField('Ranked KD Ratio', `${player.stats.skywars.ranked.KDRatio}`, true)
					.addField('Ranked WL Ratio', `${player.stats.skywars.ranked.WLRatio}`, true);

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
