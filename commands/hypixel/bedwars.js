const Discord = require('discord.js');
const commaNumber = require('comma-number');

const types = ['overall', 'solo', 'doubles', 'threes', 'fours'];

const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'bedwars',
			aliases: ['bw'],
			group: 'hypixel',
			memberName: 'bedwars',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get Hypixel Bedwars stats of a player',
			argsType: 'multiple',
			args: [
				{
					key: 'mode',
					prompt: 'Please specify a mode to choose from.',
					type: 'string'
				},
				{
					key: 'player',
					prompt: 'Please specify a player\'s IGN to get the stats from.',
					type: 'string'
				}
			]
		})
	}

	async run(message, { mode, player }) {
		if (!types.includes(mode)) {
			const nontype = new Discord.MessageEmbed()
				.setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
				.setDescription(`Invalid type!\nAvailable types are: ${types.map((x) => `\`${x}\``).join(', ')}`)
				.setColor(message.client.config.discord.accentColor)
				.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

			return message.channel.send({ embeds: [nontype] });
		}

		message.client.hypixelAPIReborn
			.getPlayer(player)
			.then((player) => {
				const embed = new Discord.MessageEmbed()
					.setTimestamp()
					.setColor(message.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setTitle(`[${player.stats.bedwars.level}✫] [${player.rank}] ${player.nickname}`)
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/BedWars-64.png');
				if (mode.toLowerCase() == 'solo') {
					embed
						.setAuthor('Solo Bedwars Stats', 'https://i.imgur.com/OuoECfX.jpeg')
						.addField('KDR', `${player.stats.bedwars.solo.KDRatio}`, true)
						.addField('Final KDR', `${player.stats.bedwars.solo.finalKDRatio}`, true)
						.addField('WL Ratio', `${player.stats.bedwars.solo.WLRatio}`, true)
						.addField('Bed Breaks', `${commaNumber(player.stats.bedwars.solo.beds.broken)}`, true)
						.addField('Beds Lost', `${commaNumber(player.stats.bedwars.solo.beds.lost)}`, true)
						.addField('Bed BL Ratio', `${player.stats.bedwars.solo.beds.BLRatio}`, true)
						.addField('Coins', `${commaNumber(player.stats.bedwars.coins)}`, true)
						.addField('Total Deaths', `${commaNumber(player.stats.bedwars.solo.deaths)}`, true)
						.addField('Final Deaths', `${commaNumber(player.stats.bedwars.solo.finalDeaths)}`, true)
						.addField('Total Kills', `${commaNumber(player.stats.bedwars.solo.kills)}`, true)
						.addField('Total Final Kills', `${commaNumber(player.stats.bedwars.solo.finalKills)}`, true)
						.addField('Winstreak', `${commaNumber(player.stats.bedwars.solo.winstreak)}`, true)
						.addField('Total Wins', `${commaNumber(player.stats.bedwars.solo.wins)}`, true)
				} else if (mode.toLowerCase() == 'doubles') {
					embed
						.setAuthor('Doubles Bedwars Stats', 'https://i.imgur.com/OuoECfX.jpeg')
						.addField('KDR', `${player.stats.bedwars.doubles.KDRatio}`, true)
						.addField('Final KDR', `${player.stats.bedwars.doubles.finalKDRatio}`, true)
						.addField('WL Ratio', `${player.stats.bedwars.doubles.WLRatio}`, true)
						.addField('Bed Breaks', `${commaNumber(player.stats.bedwars.doubles.beds.broken)}`, true)
						.addField('Beds Lost', `${commaNumber(player.stats.bedwars.doubles.beds.lost)}`, true)
						.addField('Bed BL Ratio', `${player.stats.bedwars.doubles.beds.BLRatio}`, true)
						.addField('Coins', `${commaNumber(player.stats.bedwars.coins)}`, true)
						.addField('Total Deaths', `${commaNumber(player.stats.bedwars.doubles.deaths)}`, true)
						.addField('Final Deaths', `${commaNumber(player.stats.bedwars.doubles.finalDeaths)}`, true)
						.addField('Total Kills', `${commaNumber(player.stats.bedwars.doubles.kills)}`, true)
						.addField('Total Final Kills', `${commaNumber(player.stats.bedwars.doubles.finalKills)}`, true)
						.addField('Winstreak', `${commaNumber(player.stats.bedwars.doubles.winstreak)}`, true)
						.addField('Total Wins', `${commaNumber(player.stats.bedwars.doubles.wins)}`, true)
				} else if (mode.toLowerCase() == 'threes') {
					embed
						.setAuthor('3v3v3v3 Bedwars Stats', 'https://i.imgur.com/OuoECfX.jpeg')
						.addField('KDR', `${player.stats.bedwars.threes.KDRatio}`, true)
						.addField('Final KDR', `${player.stats.bedwars.threes.finalKDRatio}`, true)
						.addField('WL Ratio', `${player.stats.bedwars.threes.WLRatio}`, true)
						.addField('Bed Breaks', `${commaNumber(player.stats.bedwars.threes.beds.broken)}`, true)
						.addField('Beds Lost', `${commaNumber(player.stats.bedwars.threes.beds.lost)}`, true)
						.addField('Bed BL Ratio', `${player.stats.bedwars.threes.beds.BLRatio}`, true)
						.addField('Coins', `${commaNumber(player.stats.bedwars.coins)}`, true)
						.addField('Total Deaths', `${commaNumber(player.stats.bedwars.threes.deaths)}`, true)
						.addField('Final Deaths', `${commaNumber(player.stats.bedwars.threes.finalDeaths)}`, true)
						.addField('Total Kills', `${commaNumber(player.stats.bedwars.threes.kills)}`, true)
						.addField('Total Final Kills', `${commaNumber(player.stats.bedwars.threes.finalKills)}`, true)
						.addField('Winstreak', `${commaNumber(player.stats.bedwars.threes.winstreak)}`, true)
						.addField('Total Wins', `${commaNumber(player.stats.bedwars.threes.wins)}`, true)
				} else if (mode.toLowerCase() == 'fours') {
					embed
						.setAuthor('4v4v4v4 Bedwars Stats', 'https://i.imgur.com/OuoECfX.jpeg')
						.addField('KDR', `${player.stats.bedwars.fours.KDRatio}`, true)
						.addField('Final KDR', `${player.stats.bedwars.fours.finalKDRatio}`, true)
						.addField('WL Ratio', `${player.stats.bedwars.fours.WLRatio}`, true)
						.addField('Bed Breaks', `${commaNumber(player.stats.bedwars.threes.beds.broken)}`, true)
						.addField('Beds Lost', `${commaNumber(player.stats.bedwars.threes.beds.lost)}`, true)
						.addField('Bed BL Ratio', `${player.stats.bedwars.threes.beds.BLRatio}`, true)
						.addField('Coins', `${commaNumber(player.stats.bedwars.coins)}`, true)
						.addField('Total Deaths', `${commaNumber(player.stats.bedwars.fours.deaths)}`, true)
						.addField('Final Deaths', `${commaNumber(player.stats.bedwars.fours.finalDeaths)}`, true)
						.addField('Total Kills', `${commaNumber(player.stats.bedwars.fours.kills)}`, true)
						.addField('Total Final Kills', `${commaNumber(player.stats.bedwars.fours.finalKills)}`, true)
						.addField('Winstreak', `${commaNumber(player.stats.bedwars.fours.winstreak)}`, true)
						.addField('Total Wins', `${commaNumber(player.stats.bedwars.fours.wins)}`, true)
				} else if (mode.toLowerCase() == 'overall') {
					embed
						.setAuthor('Overall Bedwars Stats', 'https://i.imgur.com/OuoECfX.jpeg')
						.addField('KDR', `${player.stats.bedwars.KDRatio}`, true)
						.addField('Final KDR', `${player.stats.bedwars.finalKDRatio}`, true)
						.addField('WL Ratio', `${player.stats.bedwars.WLRatio}`, true)
						.addField('Bed Breaks', `${commaNumber(player.stats.bedwars.beds.broken)}`, true)
						.addField('Beds Lost', `${commaNumber(player.stats.bedwars.beds.lost)}`, true)
						.addField('Bed BL Ratio', `${player.stats.bedwars.beds.BLRatio}`, true)
						.addField('Coins', `${commaNumber(player.stats.bedwars.coins)}`, true)
						.addField('Total Deaths', `${commaNumber(player.stats.bedwars.deaths)}`, true)
						.addField('Final Deaths', `${commaNumber(player.stats.bedwars.finalDeaths)}`, true)
						.addField('Total Kills', `${commaNumber(player.stats.bedwars.kills)}`, true)
						.addField('Total Final Kills', `${commaNumber(player.stats.bedwars.finalKills)}`, true)
						.addField('Winstreak', `${commaNumber(player.stats.bedwars.winstreak)}`, true)
						.addField('Total Wins', `${commaNumber(player.stats.bedwars.wins)}`, true)
						.addField('Iron Collected', `${commaNumber(player.stats.bedwars.collectedItemsTotal.iron)}`, true)
						.addField('Gold Collected', `${commaNumber(player.stats.bedwars.collectedItemsTotal.gold)}`, true)
						.addField('Diamonds Collected', `${commaNumber(player.stats.bedwars.collectedItemsTotal.diamond)}`, true)
						.addField('Emeralds Collected', `${commaNumber(player.stats.bedwars.collectedItemsTotal.emerald)}`, true);
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
					if (mode) {
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
