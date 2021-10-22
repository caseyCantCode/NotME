const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'nsfw-neko',
			aliases: ['neko-but-nsfw'],
			group: 'nsfw',
			memberName: 'nsfw-neko',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random NSFW neko image.',
			nsfw: true,
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your NSFW neko image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		let data = await message.client.nekos.nsfw.neko();
		embed.setImage(data.url);

		message.channel.send(embed);
	}
};
