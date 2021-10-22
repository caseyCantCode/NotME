const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class PatCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'pat',
			group: 'anime',
			memberName: 'pat',
			ownerOnly: false,
			guildOnly: true,
			description: 'Give someone a headpat.',
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
		let data = await neko.sfw.pat();

		console.log(data);

		if (mention.user === message.author) {
			const embed = new MessageEmbed()
				.setColor(mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor)
				.setImage(data.url)
				.setAuthor(`${message.author.username} pats themselves! Hmm...`, mention.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setColor(mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor)
				.setImage(data.url)
				.setAuthor(`${message.author.username} pats ${mention.user.username}! Awww!`, mention.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		}
	}
};
