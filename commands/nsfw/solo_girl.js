const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'nsfw-girl',
			aliases: ['waifu-but-nsfw'],
			group: 'nsfw',
			memberName: 'nsfw-girl',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random hentai solo girl image.',
			nsfw: true,
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your hentai solo girl image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
		let data = await message.client.nekos.nsfw.girlSolo();
		embed.setImage(data.url);

		message.channel.send(embed);
	}
};
