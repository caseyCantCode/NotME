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
					key: 'user',
					prompt: 'Which user do you want to use with this command? (@user)',
					type: 'member',
				},
				{
					key: 'text',
					prompt: 'Type something.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { user, text }) {
		const options = {
			image: user.user.displayAvatarURL({ format: 'png' }),
			username: user.user.username,
			message: text,
			color: user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor,
		};

		const image = await canvacord.Canvacord.quote(options);
		const attachment = new Discord.MessageAttachment(image, 'fakequotes.png');

		const embed = new Discord.MessageEmbed()
			.setImage('attachment://fakequotes.png')
			.setColor(message.client.config.discord.accentColor)
			.setFooter(`Meme created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.attachFiles([attachment])
			.setTimestamp();

		message.channel.send(embed);
	}
};
