const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

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
		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your yuri image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		let data = await message.client.nekos.nsfw.yuri();
		embed.setImage(data.url);

		message.channel.send(embed);
	}
};
