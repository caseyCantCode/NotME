const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'youtube-together',
			aliases: ['dailymotion', 'vimeo', 'oniontube', 'yttogether'],
			group: 'info',
			memberName: 'youtube-together',
			ownerOnly: false,
			guildOnly: true,
			description: 'Allows you to use YouTube Together with friends.\nNot that you have any.'
		});
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		client.discordTogether.createTogetherCode(message.member.voice.channelId, 'youtube').then(async (invite) => {
			const embed = new Discord.MessageEmbed().setAuthor('YouTube Together').setColor(message.client.config.discord.accentColor).setTimestamp().setTitle(`Click here to join`).setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
