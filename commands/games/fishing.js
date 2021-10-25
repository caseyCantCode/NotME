const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'fishington',
			group: 'games',
			memberName: 'fishington',
			ownerOnly: false,
			guildOnly: true,
			description: 'fishy fishy',
		});
	}

	async run(message) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async (invite) => {
			const embed = new Discord.MessageEmbed().setAuthor('Fishington.io').setColor(message.client.config.discord.accentColor).setTimestamp().setTitle(`Click here to join`).setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
