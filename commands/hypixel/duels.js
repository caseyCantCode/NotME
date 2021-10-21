const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

const types = ['uhc', 'bridge', 'sumo', 'classic', 'op', 'skywars'];

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'duels',

			group: 'hypixel',
			memberName: 'duels',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get Hypixel Duels stats of a player',
			argsType: 'multiple',
			args: [
				{
					key: 'mode',
					prompt: 'Please select a mode!',
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
		if (mode.toLowerCase() == 'classic') {
			message.client.hypixelAPIReborn
				.getPlayer(player)
				.then((player) => {
					const embed = new Discord.MessageEmbed()
						.setTimestamp()
						.setAuthor('Classic Duels Stats (1v1)', 'https://i.imgur.com/OuoECfX.jpeg')
						.setTitle(`[${player.rank}] ${player.nickname}`)
						.setColor(message.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.addField('Kills', `\`${commaNumber(player.stats.duels.classic.kills)}\``, true)
						.addField('Losses', `\`${commaNumber(player.stats.duels.classic.losses)}\``, true)
						.addField('Deaths', `\`${commaNumber(player.stats.duels.classic.deaths)}\``, true)
						.addField('Wins', `\`${commaNumber(player.stats.duels.classic.wins)}\``, true);

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
		} else if (mode.toLowerCase() == 'uhc') {
			

			message.client.hypixelAPIReborn
				.getPlayer(player)
				.then((player) => {
					const embed = new Discord.MessageEmbed()
						.setTimestamp()
						.setAuthor('UHC Duels Stats (1v1)', 'https://i.imgur.com/OuoECfX.jpeg')
						.setTitle(`[${player.rank}] ${player.nickname}`)
						.setColor(message.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.addField('Kills', `\`${commaNumber(player.stats.duels.uhc['1v1'].kills)}\``, true)
						.addField('Losses', `\`${commaNumber(player.stats.duels.uhc['1v1'].losses)}\``, true)
						.addField('Deaths', `\`${commaNumber(player.stats.duels.uhc['1v1'].deaths)}\``, true)
						.addField('Wins', `\`${commaNumber(player.stats.duels.uhc['1v1'].wins)}\``, true);

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
		} else if (mode.toLowerCase() == 'skywars' || mode.toLowerCase() == 'sw') {
			

			message.client.hypixelAPIReborn
				.getPlayer(player)
				.then((player) => {
					const embed = new Discord.MessageEmbed()
						.setTimestamp()
						.setAuthor('Skywars Duels Stats (1v1)', 'https://i.imgur.com/OuoECfX.jpeg')
						.setTitle(`[${player.rank}] ${player.nickname}`)
						.setColor(message.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.addField('Kills', `\`${commaNumber(player.stats.duels.skywars['1v1'].kills)}\``, true)
						.addField('Losses', `\`${commaNumber(player.stats.duels.skywars['1v1'].losses)}\``, true)
						.addField('Deaths', `\`${commaNumber(player.stats.duels.skywars['1v1'].deaths)}\``, true)
						.addField('Wins', `\`${commaNumber(player.stats.duels.skywars['1v1'].wins)}\``, true);

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
		} else if (mode.toLowerCase() == 'bridge') {
			

			message.client.hypixelAPIReborn
				.getPlayer(player)
				.then((player) => {
					const embed = new Discord.MessageEmbed()
						.setTimestamp()
						.setAuthor('Bridge Duels Stats (1v1)', 'https://i.imgur.com/OuoECfX.jpeg')
						.setTitle(`[${player.rank}] ${player.nickname}`)
						.setColor(message.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.addField('Kills', `\`${commaNumber(player.stats.duels.bridge['1v1'].kills)}\``, true)
						.addField('Losses', `\`${commaNumber(player.stats.duels.bridge['1v1'].losses)}\``, true)
						.addField('Deaths', `\`${commaNumber(player.stats.duels.bridge['1v1'].deaths)}\``, true)
						.addField('Wins', `\`${commaNumber(player.stats.duels.bridge['1v1'].wins)}\``, true);

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
		} else if (mode.toLowerCase() == 'sumo') {
			

			message.client.hypixelAPIReborn
				.getPlayer(player)
				.then((player) => {
					const embed = new Discord.MessageEmbed()
						.setTimestamp()
						.setAuthor('Sumo Duels Stats (1v1)', 'https://i.imgur.com/OuoECfX.jpeg')
						.setTitle(`[${player.rank}] ${player.nickname}`)
						.setColor(message.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.addField('Kills', `\`${commaNumber(player.stats.duels.sumo.kills)}\``, true)
						.addField('Losses', `\`${commaNumber(player.stats.duels.sumo.losses)}\``, true)
						.addField('Deaths', `\`${commaNumber(player.stats.duels.sumo.deaths)}\``, true)
						.addField('Wins', `\`${commaNumber(player.stats.duels.sumo.wins)}\``, true);

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
		} else if (mode.toLowerCase() == 'op') {
			

			message.client.hypixelAPIReborn
				.getPlayer(player)
				.then((player) => {
					const embed = new Discord.MessageEmbed()
						.setTimestamp()
						.setAuthor('OP Duels Stats (1v1)', 'https://i.imgur.com/OuoECfX.jpeg')
						.setTitle(`[${player.rank}] ${player.nickname}`)
						.setColor(message.client.config.discord.accentColor)
						.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
						.addField('Kills', `\`${commaNumber(player.stats.duels.op['1v1'].kills)}\``, true)
						.addField('Losses', `\`${commaNumber(player.stats.duels.op['1v1'].losses)}\``, true)
						.addField('Deaths', `\`${commaNumber(player.stats.duels.op['1v1'].deaths)}\``, true)
						.addField('Wins', `\`${commaNumber(player.stats.duels.op['1v1'].wins)}\``, true);

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
		} else {
			return message.channel.send(`${message.client.emotes.error} - Bad argument!\nAvailable duels types are: ${types.map((x) => `\`${x}\``).join(', ')}.`);
		}
	}
};
