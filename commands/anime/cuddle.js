const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const neko_client = require('nekos.life');
const neko = new neko_client();

module.exports = class CuddleCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'cuddle',
			group: 'anime',
			memberName: 'cuddle',
			ownerOnly: false,
			guildOnly: true,
			description: 'Cuddles someone.',
			examples: ['cuddle @minhcrafters#0001'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to use with this command? (@user)',
					type: 'member',
				},
			],
		});
	}

	async run(message, { user }) {
		let data = await neko.sfw.cuddle();

		console.log(data);

		if (user.user === message.author) {
			const embed = new MessageEmbed()
				.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
				.setImage(data.url)
				.setAuthor(`${message.author.username} cuddles themselves!`, user.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setColor(message.author.displayHexColor === '#000000' ? '#ffffff' : message.author.displayHexColor)
				.setImage(data.url)
				.setAuthor(`${message.author.username} cuddles ${user.user.username}! What...`, message.author.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		}
	}
};
