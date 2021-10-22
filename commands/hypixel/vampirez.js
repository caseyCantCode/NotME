const Discord = require('discord.js');

const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'vampirez',
			aliases: ['vz', 'vampire', 'vampires', 'vampz'],
			group: 'hypixel',
			memberName: 'vampirez',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get Hypixel VampireZ stats of a player',
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
					.setAuthor('VampireZ Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(message.client.config.discord.accentColor)
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/VampireZ-64.png')
					.addField('Coins', `${commaNumber(player.stats.vampirez.coins)}`, true)
					.addField('Human Wins', `${commaNumber(player.stats.vampirez.human.wins)}`, true)
					.addField('Human Kills', `${commaNumber(player.stats.vampirez.human.kills)}`, true)
					.addField('Human Deaths', `${commaNumber(player.stats.vampirez.human.deaths)}`, true)
					.addField('Human KD Ratio', `${commaNumber(player.stats.vampirez.human.KDRatio)}`, true)
					.addField('Zombie Kills', `${commaNumber(player.stats.vampirez.zombie.kills)}`, true);

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
