const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const akaneko = require('akaneko');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'yuri',
			group: 'nsfw',
			memberName: 'yuri',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random yuri image.',
			nsfw: true,
		});
	}

	async run(message) {
		const data = akaneko.nsfw.yuri();

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your yuri image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		embed.setImage(data);

		message.channel.send(embed);
	}
};
