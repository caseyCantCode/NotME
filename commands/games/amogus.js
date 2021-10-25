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
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		message.client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async (invite) => {
			const embed = new Discord.MessageEmbed().setAuthor('Betrayal.io').setColor(message.client.config.discord.accentColor).setTimestamp().setTitle(`Click here to join`).setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
