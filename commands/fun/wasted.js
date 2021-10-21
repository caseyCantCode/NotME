const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'wasted',
			group: 'fun',
			memberName: 'wasted',
			ownerOnly: false,
			guildOnly: true,
			description: 'Wasted.',
			args: [
				{
					key: 'user',
					prompt: 'Please specify a user!',
					type: 'member'
				}
			]
		})
	}

	async run(message, { user }) {
		const image = await canvacord.Canvacord.wasted(user.user.displayAvatarURL({ format: 'png' }));
		const attachment = new Discord.MessageAttachment(image, 'wasted.png');

		const embed = new Discord.MessageEmbed()
			.setImage('attachment://wasted.png')
			.setColor(message.client.config.discord.accentColor)
			.setFooter(`Meme created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		message.channel.send({ embeds: [embed], files: [attachment] });
	}
};
