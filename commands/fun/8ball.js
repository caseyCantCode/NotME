const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class EightBall extends Commando.Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			group: 'fun',
			memberName: '8ball',
			ownerOnly: false,
			guildOnly: false,
			description: 'magik 8balls',
			args: [
				{
					key: 'text',
					prompt: 'What do you want to know?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		let data = await this.client.nekos.sfw['8Ball'](text);
		console.log(data);

		const embed = new MessageEmbed()
			.setAuthor(`Magic 8Ball`, this.client.user.displayAvatarURL())
			.setTitle(text)
			.setColor(this.client.config.discord.accentColor)
			.setDescription(data.response)
			.setImage(data.url)
			.setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		message.channel.send(embed);
	}
};
