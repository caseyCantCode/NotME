const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'poker',
			aliases: ['poker-night', 'poopooker', 'cardgameidfk'],
			group: 'fun',
			memberName: 'poker',
			ownerOnly: false,
			guildOnly: true,
			description: 'pokah',
		})
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		message.client.discordTogether.createTogetherCode(message.member.voice.channelId, 'poker').then(async (invite) => {
			const embed = new Discord.MessageEmbed().setAuthor('Poker Night').setColor(message.client.config.discord.accentColor).setTimestamp().setTitle(`Click here to join`).setURL(invite.code);

			return message.channel.send({ embeds: [embed] });
		});
	}
};
