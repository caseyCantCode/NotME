const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'copsandcrims',
			aliases: ['c&c', 'cac', 'cvc', 'cops', 'crims'],
			group: 'hypixel',
			memberName: 'copsandcrims',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get Hypixel Cops and Crims stats of a player',
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
		this.client.hypixelAPIReborn
			.getPlayer(player)
			.then((player) => {
				const embed = new Discord.MessageEmbed()
					.setTimestamp()
					.setAuthor('Cops and Crims Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(this.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/CVC-64.png')
					.addField('Coins', `\`${commaNumber(player.stats.copsandcrims.coins)}\``, true)
					.addField('Wins', `\`${commaNumber(player.stats.copsandcrims.wins)}\``, true)
					.addField('Round Wins', `\`${commaNumber(player.stats.copsandcrims.roundWins)}\``, true)
					.addField('Kills', `\`${commaNumber(player.stats.copsandcrims.kills)}\``, true)
					.addField('Criminal Kills', `\`${commaNumber(player.stats.copsandcrims.killsAsCrim)}\``, true)
					.addField('Cop Kills', `\`${commaNumber(player.stats.copsandcrims.killsAsCop)}\``, true)
					.addField('Deathes', `\`${commaNumber(player.stats.copsandcrims.deaths)}\``, true)
					.addField('Deathmatch Kills', `\`${commaNumber(player.stats.copsandcrims.deathmatch.kills)}\``, true)
					.addField('Headshot Kills', `\`${commaNumber(player.stats.copsandcrims.headshotKills)}\``, true)
					.addField('Bombs Defused', `\`${commaNumber(player.stats.copsandcrims.bombsDefused)}\``, true)
					.addField('Bombs Planted', `\`${commaNumber(player.stats.copsandcrims.bombsPlanted)}\``, true)
					.addField('KD Ratio', `\`${commaNumber(player.stats.copsandcrims.KDRatio)}\``, true);

				message.channel.send(embed);
			})
			.catch((e) => {
				if (e.message === this.client.HypixelAPIReborn.Errors.PLAYER_DOES_NOT_EXIST) {
					const player404 = new Discord.MessageEmbed()
						.setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
						.setDescription('I could not find that player in the API. Check spelling and name history.')
						.setColor(this.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
					message.channel.send(player404);
				} else {
					if (args[0]) {
						const error = new Discord.MessageEmbed()
							.setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
							.setDescription('An error has occurred')
							.addField('Error', `\`\`\`js\n${e}\n\`\`\``)
							.setColor(this.client.config.discord.accentColor)
							.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
						message.channel.send(error);
					}
				}
			});
	}
};
