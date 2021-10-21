const canvacord = require('canvacord');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'fakequote',
			aliases: ['fq'],
			group: 'fun',
			memberName: 'fakequote',
			ownerOnly: false,
			guildOnly: true,
			description: 'Returns fake quotes.',
			argsType: 'multiple',
			args: [
				{
					key: 'mention',
					prompt: 'Please specify a user!',
					type: 'member',
				},
				{
					key: 'text',
					prompt: 'Type something please.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { mention, text }) {
		const options = {
			image: mention.user.displayAvatarURL({ format: 'png' }),
			username: mention.user.username,
			message: text,
			color: mention.displayHexColor === '#000000' ? '#ffffff' : mention.displayHexColor,
		};

		const image = await canvacord.Canvacord.quote(options);
		const attachment = new Discord.MessageAttachment(image, 'fakequotes.png');

		const embed = new Discord.MessageEmbed()
			.setImage('attachment://fakequotes.png')
			.setColor(message.client.config.discord.accentColor)
			.setFooter(`Meme created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		message.channel.send({ embeds: [embed], files: [attachment] });
	}
};
