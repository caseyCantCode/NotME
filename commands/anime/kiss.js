const { Random } = require('something-random-on-discord');
const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class KissCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'anime',
			memberName: 'kiss',
			ownerOnly: false,
			guildOnly: true,
			description: 'Kisses someone.',
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
		let data = await neko.sfw.kiss();

		console.log(data);

		if (mention.user === message.author) {
			return message.channel.send(`${message.client.emotes.error} - You can't kiss yourself!`);
		}

		const embed = new MessageEmbed()
			.setColor(mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor)
			.setImage(data.url)
			.setAuthor(`${message.author.username} kisses ${mention.user.username}! So sweet...`, mention.user.displayAvatarURL({ dynamic: true }));

		message.channel.send({ embeds: [embed] });
	}
};
