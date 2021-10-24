const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'calculate',
			aliases: ['calc'],
			group: 'math',
			memberName: 'calculate',
			ownerOnly: false,
			guildOnly: false,
			description: 'Calculates a non-algebra expression.',
		});
	}

	async run(message, args) {
		if (!args) {
			await message.client.weky.Calculator({
				message: message,
				embed: {
					title: `${message.author.username}'s Calculator`,
					color: message.client.config.discord.accentColor,
					footer: '©️ NotME',
					timestamp: true,
				},
				disabledQuery: 'Calculator is disabled!',
				invalidQuery: 'The provided equation is invalid!',
				othersMessage: 'Only <@{{author}}> can use the buttons!',
			});
		}

		let response;

		try {
			response = math.round(math.evaluate(args[0]), 2);
		} catch {
			return message.channel.send(`${message.client.emotes.error} - Invalid expression!`);
		}

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setTitle('Math Expressions Calculation')
			.addFields(
				{
					name: 'Input',
					value: `\`\`\`js\n${expression}\n\`\`\``,
					inline: false,
				},
				{
					name: 'Output',
					value: `\`\`\`js\n${response}\`\`\``,
					inline: false,
				}
			)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		message.channel.send(embed);
	}
};
