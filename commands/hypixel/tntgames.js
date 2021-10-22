const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'tntgames',
			aliases: ['tnt'],
			group: 'hypixel',
			memberName: 'tntgames',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get Hypixel TNT Games stats of a player',
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
		message.client.hypixelAPIReborn
			.getPlayer(player)
			.then((player) => {
				const embed = new Discord.MessageEmbed()
					.setTimestamp()
					.setAuthor('TNT Games Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(message.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/TNT-64.png')
					.addField('Coins', `${commaNumber(player.stats.tntgames.coins)}`, true)
					.addField('Total Wins', `${commaNumber(player.stats.tntgames.wins)}`, true)
					.addField('Winstreak', `${commaNumber(player.stats.tntgames.winstreak)}`, true)
					.addField('TNT Run Wins', `${commaNumber(player.stats.tntgames.tntrun.wins)}`, true)
					.addField('TNT Run Deaths', `${commaNumber(player.stats.tntgames.tntrun.deaths)}`, true)
					.addField(
						'TNT Run Longest Game (Minutes)',
						`${Math.floor(player.stats.tntgames.tntrun.record / 60)}:${player.stats.tntgames.tntrun.record - Math.floor(player.stats.tntgames.tntrun.record / 60) * 60}`,
						true
					)
					.addField('PvP Run Wins', `${commaNumber(player.stats.tntgames.pvprun.wins)}`, true)
					.addField('PvP Run Deaths', `${commaNumber(player.stats.tntgames.pvprun.deaths)}`, true)
					.addField(
						'PvP Run Longest Game (Minutes)',
						`${Math.floor(player.stats.tntgames.pvprun.record / 60)}:${player.stats.tntgames.pvprun.record - Math.floor(player.stats.tntgames.pvprun.record / 60) * 60}`,
						true
					)
					.addField('PvP Run Kills', `${commaNumber(player.stats.tntgames.pvprun.kills)}`, true)
					.addField('PvP Run KD Ratio', `${commaNumber(player.stats.tntgames.pvprun.KDRatio)}`, true)
					.addField('PvP Run Wins', `${commaNumber(player.stats.tntgames.pvprun.wins)}`, true)
					.addField('TNT Tag Kills', `${commaNumber(player.stats.tntgames.tnttag.kills)}`, true)
					.addField('TNT Tag Wins', `${commaNumber(player.stats.tntgames.tnttag.wins)}`, true)
					.addField('TNT Tag Speed', `${commaNumber(player.stats.tntgames.tnttag.speed)}`, true)
					.addField('Bow Spleef Wins', `${commaNumber(player.stats.tntgames.bowspleef.wins)}`, true)
					.addField('Bow Spleef Tags', `${commaNumber(player.stats.tntgames.bowspleef.tags)}`, true)
					.addField('Bow Spleef Deaths', `${commaNumber(player.stats.tntgames.bowspleef.deaths)}`, true)
					.addField('Wizards Wins', `${commaNumber(player.stats.tntgames.wizards.wins)}`, true)
					.addField('Wizards Kills', `${commaNumber(player.stats.tntgames.wizards.kills)}`, true)
					.addField('Wizards Deaths', `${commaNumber(player.stats.tntgames.wizards.deaths)}`, true)
					.addField('Wizards Assists', `${commaNumber(player.stats.tntgames.wizards.wins)}`, true)
					.addField('Wizards KD Ratio', `${commaNumber(player.stats.tntgames.wizards.KDRatio)}`, true)
					.addField('Wizards Points', `${commaNumber(player.stats.tntgames.wizards.points)}`, true)
					.addField('Wizards Class', `${player.stats.tntgames.wizards.class || 'No Class'}`, true);

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
