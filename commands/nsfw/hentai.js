const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'hentai',
			aliases: ['hent'],
			group: 'nsfw',
			memberName: 'hentai',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random hentai image.',
			nsfw: true,
		});
	}

	async run(message) {
		const data = await message.client.nekos.nsfw.randomHentaiGif();

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your hentai image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		embed.setImage(data.url);

		message.channel.send(embed);
	}
};
