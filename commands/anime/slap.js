const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class SlapCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'slap',
			group: 'anime',
			memberName: 'slap',
			ownerOnly: false,
			guildOnly: true,
			description: 'Slap someone in their face.',
			args: [
				{
					key: 'mention',
					prompt: 'Please specify a user!',
					type: 'member',
				},
			],
		});
	}

	async run(message, { mention }) {
		let data = await neko.sfw.slap();

		console.log(data);

		if (mention.user === message.author) {
			const embed = new MessageEmbed()
				.setColor(mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor)
				.setImage(data.url)
				.setAuthor(`${message.author.username} slaps themselves in their face! It hurts...`, mention.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setColor(mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor)
				.setImage(data.url)
				.setAuthor(`${message.author.username} slaps ${mention.user.username} in their face! Ouch!`, mention.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		}
	}
};
