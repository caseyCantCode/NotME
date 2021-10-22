const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'wanted',
			group: 'fun',
			memberName: 'wanted',
			ownerOnly: false,
			guildOnly: true,
			description: 'Wanted.',
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
		const image = await canvacord.Canvacord.wanted(user.user.displayAvatarURL({ format: 'png' }));
		const attachment = new Discord.MessageAttachment(image, 'wanted.png');

		const embed = new Discord.MessageEmbed()
			.setImage('attachment://wanted.png')
			.setColor(message.client.config.discord.accentColor)
			.setFooter(`Meme created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.attachFiles([attachment])
			.setTimestamp();

		message.channel.send(embed);
	}
};
