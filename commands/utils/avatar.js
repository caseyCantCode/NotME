const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			aliases: ['av'],
			group: 'util',
			memberName: 'avatar',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shows a specific user\'s avatar with a specified size and a specified image format (Default is 4096 and PNG).',
			args: [
				{
					key: 'user',
					prompt: 'Please specify a user!',
					type: 'user'
				},
				{
					key: 'size',
					prompt: 'Set the size!',
					type: 'integer',
					default: 4096
				}
			]
		});
	}

	async run(message, { user, size }) {
		/*
        const embed = new MessageEmbed()
            .setTitle(user.nickname)
            .setImage(user.user.displayAvatarURL({
                dynamic: true,
                format: format,
                size: size
            }))
            .setDescription('Actual image may larger or smaller than this image.')
            .setTimestamp()
            .setFooter(`Image Format: ${format.toUpperCase()}, Image Size: ${size}`);
        */

		const embed = new MessageEmbed()
			.setTitle(user.username + "'s Avatar")
			.setColor(message.client.config.discord.accentColor)
			.setDescription(`Image Size: ${size}\nURL: [Click here](${user.avatarURL({ dynamic: true, size: size })})`)
			.setImage(
				user.avatarURL({
					dynamic: true,
					size: size,
				})
			)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		return message.channel.send({ embeds: [embed] });
	}
};
