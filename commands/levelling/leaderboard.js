const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'leaderboard',
			aliases: ['leaders'],
			group: 'level',
			memberName: 'leaderboard',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shows the leaderboard.',
		});
	}

	async run(message) {
		const filtered = message.client.points.filter((p) => p.guild === message.guild.id).array();
		const sorted = filtered.sort((a, b) => b.points - a.points);
		const top10 = sorted.splice(0, 10);
		const embed = new MessageEmbed().setTitle('Ranking Leaderboard').setAuthor(`${message.guild.name}'s'`, message.guild.iconURL()).setColor(message.client.config.discord.accentColor);
		for (const data of top10) {
			try {
				embed.addField(message.client.users.cache.get(data.user).tag, `${data.points} XP (level ${data.level})`);
			} catch {
				embed.addField(`<@${data.user}>`, `${data.points} XP (level ${data.level})`);
			}
		}
		return message.channel.send(embed);
	}
};
