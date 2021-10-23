const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const akaneko = require('akaneko');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'doujin',
			aliases: ['waifu-but-nsfw'],
			group: 'nsfw',
			memberName: 'doujin',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random doujin page image.',
			nsfw: true,
		});
	}

	async run(message) {
		const data = akaneko.nsfw.doujin();

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your doujin image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		embed.setImage(data);

		message.channel.send(embed);
	}
};
