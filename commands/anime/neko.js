const { MessageEmbed } = require('discord.js');
const akaneko = require('akaneko');
const Commando = require('discord.js-commando');

module.exports = class NekoCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'neko',
			group: 'anime',
			memberName: 'neko',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random neko image.',
		});
	}

	async run(message) {
		let data = await akaneko.neko();

		console.log(data);

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('NEKO', message.author.displayAvatarURL({ dynamic: true }))
			.setImage(data);

		message.channel.send(embed);
	}
};
