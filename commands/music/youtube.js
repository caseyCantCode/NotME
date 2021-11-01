const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'youtube-together',
			aliases: ['dailymotion', 'vimeo', 'oniontube', 'yttogether'],
			group: 'music',
			memberName: 'youtube-together',
			ownerOnly: false,
			guildOnly: true,
			description: 'Allows you to use YouTube Together with friends.\nNot that you have any.',
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

		this.client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async (invite) => {
			const embed = new Discord.MessageEmbed()
				.setAuthor('YouTube Together')
				.setColor(this.client.config.discord.accentColor)
				.setTimestamp()
				.setTitle(`Click here to join`)
				.setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
