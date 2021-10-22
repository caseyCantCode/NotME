const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
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
		let data = await neko.sfw.neko();

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('NEKO', message.author.displayAvatarURL({ dynamic: true }))
			.setImage(data.url);

		message.channel.send(embed);
	}
};
