const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'chess',
			aliases: ['citp', 'chess-in-the-park'],
			group: 'games',
			memberName: 'chess',
			ownerOnly: false,
			guildOnly: true,
			description: 'play chess',
		});
	}

	async run(message) {
		var channel = message.mentions.channels.first();

		if (!channel) {
			channel = message.member.voice.channel;

			if (!channel) return message.channel.send(`${this.client.emotes.error} - You're not connected in any voice channel!`);
		}

		if (channel.type !== 'voice') {
			return message.channel.send(`${this.client.emotes.error} - Invalid voice channel!`);
		}

		this.client.discordTogether.createTogetherCode(channel.id, 'chess').then(async (invite) => {
			const embed = new Discord.MessageEmbed()
				.setAuthor('Chess in the Park')
				.setColor(this.client.config.discord.accentColor)
				.setTimestamp()
				.setTitle(`Click here to join`)
				.setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
