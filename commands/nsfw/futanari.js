const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'futanari',
			aliases: ['futa'],
			group: 'nsfw',
			memberName: 'futanari',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random futanari image.',
			nsfw: true
		});
	}

	async run(message) {
		let data = await message.client.nekos.nsfw.futanari();

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your futanari image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		
		embed.setImage(data.url);

		message.channel.send({ embeds: [embed] });
	}
};
