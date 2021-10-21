const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class HugCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'hug',
			group: 'anime',
			memberName: 'hug',
			ownerOnly: false,
			guildOnly: true,
			description: 'Hugs someone.',
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
		let data = await neko.sfw.hug();

		if (mention.user === message.author) {
			return message.channel.send(`${message.client.emotes.error} - You can't hug yourself!`);
		}

		const embed = new MessageEmbed()
			.setColor(mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor)
			.setImage(data.url)
			.setAuthor(`${message.author.username} hugs ${mention.user.username}! Yay...`, mention.user.displayAvatarURL({ dynamic: true }));

		message.channel.send({ embeds: [embed] });
	}
};
