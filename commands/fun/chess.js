const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class ChessCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'chess',
			aliases: ['citp', 'chess-in-the-park'],
			group: 'fun',
			memberName: 'chess',
			ownerOnly: false,
			guildOnly: true,
			description: 'play chess',
		});
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		message.client.discordTogether.createTogetherCode(message.member.voice.channelId, 'chess').then(async (invite) => {
			const embed = new Discord.MessageEmbed()
				.setAuthor('Chess in the Park')
				.setColor(message.client.config.discord.accentColor)
				.setTimestamp()
				.setTitle(`Click here to join`)
				.setURL(invite.code);

			return message.channel.send({ embeds: [embed] });
		});
	}
};
