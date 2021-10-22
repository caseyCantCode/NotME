const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'jail',
			group: 'fun',
			memberName: 'jail',
			ownerOnly: false,
			guildOnly: true,
			description: 'Send someone to jail.',
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
		const image = await canvacord.Canvacord.jail(user.user.displayAvatarURL({ format: 'png' }));
		const attachment = new Discord.MessageAttachment(image, 'jail.png');

		const embed = new Discord.MessageEmbed()
			.setTitle(`${user.user.username} is locked in jail by ${message.author.username}!`)
			.setImage('attachment://jail.png')
			.setColor(message.client.config.discord.accentColor)
			.setFooter(`Meme created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.attachFiles([attachment])
			.setTimestamp();

		message.channel.send(embed);
	}
};
