const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'buildbattle',
			aliases: ['bb'],
			group: 'hypixel',
			memberName: 'buildbattle',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get Hypixel Build Battle stats of a player',
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
					.setAuthor('Build Battle Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(message.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/BuildBattle-64.png')
					.addField('Coins', `${commaNumber(player.stats.buildbattle.coins)}`, true)
					.addField('Total Wins', `${commaNumber(player.stats.buildbattle.totalWins)}`, true)
					.addField('Total Games', `${commaNumber(player.stats.buildbattle.playedGames)}`, true)
					.addField('Total Votes', `${commaNumber(player.stats.buildbattle.totalVotes)}`, true)
					.addField('Score', `${commaNumber(player.stats.buildbattle.score)}`, true)
					.addField('Solo Wins', `${commaNumber(player.stats.buildbattle.wins.solo)}`, true)
					.addField('Team Wins', `${commaNumber(player.stats.buildbattle.wins.team)}`, true)
					.addField('Pro Wins', `${commaNumber(player.stats.buildbattle.wins.pro)}`, true)
					.addField('Guess That Build Wins', `${commaNumber(player.stats.buildbattle.wins.gtb)}`, true);

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
					if (args[0]) {
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
