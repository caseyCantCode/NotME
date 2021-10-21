const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'watchdog',
			aliases: ['dogpoop'],
			group: 'hypixel',
			memberName: 'watchdog',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get Hypixel Watchdog stats.'
		})
	}

	async run(message) {
		message.client.hypixelAPIReborn.getWatchdogStats().then((stats) => {
			const watchdogStatsEmbed = new Discord.MessageEmbed()
				.setAuthor('Watchdog Stats', 'https://i.imgur.com/OuoECfX.jpeg')
				.setColor(message.client.config.discord.accentColor)
				.setFooter('Watchdog is an anticheat for Hypixel', 'https://i.imgur.com/OuoECfX.jpeg')
				.addField('Total Watchdog bans', `${commaNumber(stats.byWatchdogTotal)}`, false)
				.addField('Watchdog bans in the last minute', `${commaNumber(stats.byWatchdogLastMinute)}`, false)
				.addField('Total staff bans', `${commaNumber(stats.byStaffTotal)}`, false);

			message.channel.send({ embeds: [watchdogStatsEmbed] });
		});
	}
};
