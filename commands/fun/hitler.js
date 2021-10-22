const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'hitler',
			group: 'fun',
			memberName: 'hitler',
			ownerOnly: false,
			guildOnly: true,
			description: 'Worse than Hitler.',
			args: [
				{
					key: 'user',
					prompt: 'which user do you want to use with this command? (@mention)',
					type: 'member'
				}
			]
		})
	}

	async run(message, { user }) {
		const image = await canvacord.Canvacord.hitler(user.user.displayAvatarURL({ format: 'png' }));
		const attachment = new Discord.MessageAttachment(image, 'hitler.png');

		const embed = new Discord.MessageEmbed()
			.setTitle(`${user.user.username} is worse than Hitler!`)
			.setImage('attachment://hitler.png')
			.setColor(message.client.config.discord.accentColor)
			.setFooter(`Meme created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.attachFiles([attachment])
			.setTimestamp();

		message.channel.send(embed);
	}
};
