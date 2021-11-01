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
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'member',
				},
			],
		});
	}

	async run(message, { user }) {
		let data = await neko.sfw.kiss();

		console.log(data);

		if (user.user === message.author) {
			return message.channel.send(`${this.client.emotes.error} - You can't kiss yourself!`);
		}

		const embed = new MessageEmbed()
			.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
			.setImage(data.url)
			.setAuthor(`${message.author.username} kisses ${user.user.username}! So sweet...`, user.user.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
