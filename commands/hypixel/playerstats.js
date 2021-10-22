const fetch = require('node-fetch');
const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'playerstats',
			aliases: ['ps', 'player'],
			group: 'hypixel',
			memberName: 'playerstats',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get Hypixel stats of a Minecraft player',
			args: [
				{
					key: 'player1',
					prompt: 'Please specify a player\'s IGN to get the stats from.',
					type: 'string'
				}
			]
		})
	}

	async run(message, { player1 }) {
		message.client.hypixelAPIReborn
			.getPlayer(player1, { guild: true })
			.then(async (player) => {
				const playerUUID = await fetch(`https://api.mojang.com/users/profiles/minecraft/${player1}`); // fetch uuid
				const playerUUIDData = await playerUUID.json();

				playerIsOnline = '';

				if (!player.isOnline) {
					playerIsOnline = 'Offline';
				}

				if (player.isOnline) {
					playerIsOnline = 'Online';
				}

				playerMinecraftVersion = '';

				if (player.mcVersion == null) {
					playerMinecraftVersion = 'Unknown';
				}

				if (player.mcVersion != null) {
					playerMinecraftVersion = player.mcVersion;
				}

				playerRank = '';

				if (player.rank == 'Default') {
					playerRank = 'None';
				}

				if (player.rank != 'Default') {
					playerRank = player.rank;
				}

				const firstLDate = new Date(player.firstLogin); // fetch first login date and time
				const lastLDate = new Date(player.lastLogin); // fetch last login date and time

				const firstL = firstLDate.toLocaleString(); // convert into cleaner date and time
				const lastL = lastLDate.toLocaleString(); // convert into cleaner date and time

				const playerInfoEmbed = new Discord.MessageEmbed()
					.setTimestamp()
					.setAuthor('Player Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(message.client.config.discord.accentColor)
					.setThumbnail(`https://crafatar.com/avatars/${playerUUIDData.id}?overlay&size=256`)
					.addField('Rank', `${playerRank}`, true)
					.addField('Level', `${player.level}`, true)
					.addField('Karma', `${commaNumber(player.karma)}`, true);

				if (player.guild != null) {
					if (player.guild.tag != null) {
						playerInfoEmbed.setTitle(`[${player.rank}] ${player.nickname} [${player.guild.tag}]`);
						playerInfoEmbed.addField('Guild', `${player.guild.name}`);
						playerInfoEmbed.addField('Guild Tag', `[${player.guild.tag}]`);
					} else {
						playerInfoEmbed.addField('Guild', `${player.guild.name}`);
					}
				}

				playerInfoEmbed.addField('Main MC Version', `${playerMinecraftVersion}`, true);
				playerInfoEmbed.addField('First Login', `${firstL}`);
				playerInfoEmbed.addField('Last Login', `${lastL}`);
				playerInfoEmbed.addField('Status', `${playerIsOnline}`, true);

				if (player.rank.includes('MVP+')) {
					if (player.plusColor == null) {
						playerInfoEmbed.addField('MVP+ Rank Color', 'Red');
					} else {
						playerInfoEmbed.addField('MVP+ Rank Color', `${player.plusColor}`);
					}
				} else if (player.rank.includes('MVP++')) {
					if (player.plusColor == null) {
						playerInfoEmbed.addField('MVP++ Rank Color', 'Red');
					} else {
						playerInfoEmbed.addField('MVP++ Rank Color', `${player.plusColor}`);
					}
				}

				playerInfoEmbed.addField('Social Media', `Run \`${message.client.commandPrefix}socialmedia ${player.nickname}\``);
				playerInfoEmbed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

				message.channel.send(playerInfoEmbed);
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
							.setDescription('An error has occurred.')
							.addField('Error', `\`\`\`js\n${e}\n\`\`\``)
							.setColor(message.client.config.discord.accentColor)
							.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
						message.channel.send({ embeds: [error] });
					}
				}
			});
	}
};
