const { Random } = require('something-random-on-discord');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class PunchCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'punch',
			group: 'anime',
			memberName: 'punch',
			ownerOnly: false,
			guildOnly: true,
			description: 'Punch someone.',
			args: [
				{
					key: 'mention',
					prompt: 'which user do you want to use with this command? (@mention)',
					type: 'member',
				},
			],
		});
	}

	async run(message, { mention }) {
		let data = await Random.getAnimeImgURL('punch');

		console.log(data);

		if (mention.user === message.author) {
			const embed = new MessageEmbed()
				.setColor(mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor)
				.setImage(data)
				.setAuthor(`${message.author.username} punches themselves! It hurts...`, mention.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setColor(mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor)
				.setImage(data)
				.setAuthor(`${message.author.username} punches ${mention.user.username}! Pain...`, mention.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		}
	}
};
