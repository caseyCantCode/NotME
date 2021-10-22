const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'triggered',
			group: 'fun',
			memberName: 'triggered',
			ownerOnly: false,
			guildOnly: true,
			description: 'Triggered',
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
		const avatar = user.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });
		const image = await canvacord.Canvacord.trigger(avatar);
		const attachment = new Discord.MessageAttachment(image, 'triggered.gif');
		const embed = new Discord.MessageEmbed()
			.setImage('attachment://triggered.gif')
			.setColor(message.client.config.discord.accentColor)
			.setFooter(`Meme created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.attachFiles([attachment])
			.setTimestamp();

		message.channel.send(embed);
	}
};
