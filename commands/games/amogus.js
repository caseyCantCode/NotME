const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Amogus extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'betrayal',
			aliases: ['amogus', 'amogusripoff'],
			group: 'games',
			memberName: 'betrayal',
			ownerOnly: false,
			guildOnly: true,
			description: 'tf is this',
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

		this.client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async (invite) => {
			const embed = new Discord.MessageEmbed().setAuthor('Betrayal.io').setColor(this.client.config.discord.accentColor).setTimestamp().setTitle(`Click here to join`).setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
