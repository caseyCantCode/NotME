const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const akaneko = require('akaneko');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'nsfw-maid',
			aliases: ['maid-but-nsfw'],
			group: 'nsfw',
			memberName: 'nsfw-maid',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random NSFW maid image.',
			nsfw: true,
		});
	}

	async run(message) {
		const data = await akaneko.nsfw.maid();

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setAuthor("Here's your NSFW maid image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		embed.setImage(data);

		message.channel.send(embed);
	}
};
