const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'poker',
			aliases: ['poker-night', 'poopooker', 'cardgameidfk'],
			group: 'games',
			memberName: 'poker',
			ownerOnly: false,
			guildOnly: true,
			description: 'pokah',
		});
	}

	async run(message) {
		var channel = message.mentions.channels.first();

		if (!channel) {
			channel = message.member.voice.channel;

			if (!channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);
		}

		if (channel.type !== 'voice') {
			return message.channel.send(`${message.client.emotes.error} - Invalid voice channel!`);
		}

		message.client.discordTogether.createTogetherCode(channel.id, 'poker').then(async (invite) => {
			const embed = new Discord.MessageEmbed().setAuthor('Poker Night').setColor(message.client.config.discord.accentColor).setTimestamp().setTitle(`Click here to join`).setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
