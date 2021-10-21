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
			guildOnly: true,
			description: 'Calculates a non-algebra expression.',
			args: [
				{
					key: 'expression',
					prompt: "You must provide a vaild expression to calculate!",
					type: 'string',
				},
			],
		});
	}

	async run(message, { expression }) {
		let response;

		try {
			response = math.round(math.evaluate(expression), 2);
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

		message.channel.send({ embeds: [embed] });
	}
};
