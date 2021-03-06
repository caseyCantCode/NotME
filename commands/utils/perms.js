const Discord = require('discord.js');
const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'permissions',
			aliases: ['perms'],
			group: 'util',
			memberName: 'permissions',
			ownerOnly: false,
			guildOnly: true,
			description: "Lists a specific member's permissions of this guild.",
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
		const embed = new Discord.MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setTitle(`${user.user.tag}'s permissions in ${message.guild.name}`)
			.setDescription(functions.toTitleCase(user.permissions.toArray().join('\n').replace(/_/g, ' ')).replace('Tts', 'TTS').replace('Vad', 'VAD'))
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		message.channel.send(embed);
	}
};
