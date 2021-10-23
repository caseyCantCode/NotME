const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const akaneko = require('akaneko');

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
		const data = await akaneko.nsfw.hentai();

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your hentai image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		embed.setImage(data);

		message.channel.send(embed);
	}
};
