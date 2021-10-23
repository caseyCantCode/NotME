const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const akaneko = require('akaneko');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'thighs',
			group: 'nsfw',
			memberName: 'thighs',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random woman thighs image.',
			nsfw: true,
		});
	}

	async run(message) {
		const data = await akaneko.nsfw.thighs();

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setAuthor("Here's your woman thighs image.", message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		embed.setImage(data);

		message.channel.send(embed);
	}
};
