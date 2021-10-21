const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'rip',
			group: 'fun',
			memberName: 'rip',
			ownerOnly: false,
			guildOnly: true,
			description: 'F in the chat',
			args: [
				{
					key: 'user',
					prompt: 'Please specify a user!',
					type: 'member',
				},
			]
		})
	}

	async run(message, { user }) {
		const image = await canvacord.Canvacord.rip(user.user.displayAvatarURL({ format: 'png' }));
		const attachment = new Discord.MessageAttachment(image, 'rip.png');

		const embed = new Discord.MessageEmbed()
			.setTitle('F in the chat')
			.setImage('attachment://rip.png')
			.setColor(message.client.config.discord.accentColor)
			.setFooter(`Meme created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		message.channel.send({ embeds: [embed], files: [attachment] });
	}
};
