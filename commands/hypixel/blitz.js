const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'blitz',
			aliases: ['sg'],
			group: 'hypixel',
			memberName: 'blitz',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get Hypixel Blitz stats of a player',
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
					.setAuthor('Blitz Survival Games Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(this.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.addField('Coins', `${commaNumber(player.stats.blitzsg.coins)}`, true)
					.addField('Solo Wins', `${commaNumber(player.stats.blitzsg.winsSolo)}`, true)
					.addField('Team Wins', `${commaNumber(player.stats.blitzsg.winsTeam)}`, true)
					.addField('Deaths', `${commaNumber(player.stats.blitzsg.deaths)}`, true)
					.addField('KD Ratio', `${commaNumber(player.stats.blitzsg.KDRatio)}`, true);

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
