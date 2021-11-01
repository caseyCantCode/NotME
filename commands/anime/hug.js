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
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'member',
				},
			],
		});
	}

	async run(message, { user }) {
		let data = await neko.sfw.hug();

		if (user.user === message.author) {
			return message.channel.send(`${this.client.emotes.error} - You can't hug yourself!`);
		}

		const embed = new MessageEmbed()
			.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
			.setImage(data.url)
			.setAuthor(`${message.author.username} hugs ${user.user.username}! Yay...`, user.user.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
