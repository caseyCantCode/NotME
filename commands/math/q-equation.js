const { MessageEmbed } = require('discord.js');
const mathjs = require('mathjs');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'q-equation',
			aliases: ['q-equ'],
			group: 'math',
			memberName: 'q-equation',
			ownerOnly: false,
			guildOnly: false,
			description: 'Calculates quadratic equations.',
			argsType: 'multiple',
			args: [
				{
					key: 'a',
					prompt: 'specify it or else',
					type: 'integer',
				},
				{
					key: 'b',
					prompt: 'specify it or else',
					type: 'integer',
				},
				{
					key: 'c',
					prompt: 'specify it or else',
					type: 'integer',
				},
			],
		});
	}

	async run(message, { a, b, c }) {
		let root1, root2;

		let discriminant = b * b - 4 * a * c;

		if (discriminant > 0) {
			root1 = mathjs.round((-b + Math.sqrt(discriminant)) / (2 * a), 2);
			root2 = mathjs.round((-b - Math.sqrt(discriminant)) / (2 * a), 2);

			const embed = new MessageEmbed()
				.setColor(message.client.config.discord.accentColor)
				.setTitle('Quadratic Equations Calculation')
				.addFields(
					{ name: 'Input', value: '```js\n' + `${a}x^2 + ${b}x + ${c} = 0` + '\n```', inline: false },
					{ name: 'Output', value: `\`\`\`js\nx = {${root1}, ${root2}}\`\`\``, inline: false }
				)
				.setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();

			message.channel.send(embed);
		} else if (discriminant == 0) {
			root1 = root2 = mathjs.round(-b / (2 * a), 2);

			const embed = new MessageEmbed()
				.setColor(message.client.config.discord.accentColor)
				.setTitle('Quadratic Equation Calculation')
				.addFields(
					{ name: 'Input', value: '```js\n' + `${a}x^2 + ${b}x + ${c} = 0` + '\n```', inline: false },
					{ name: 'Output', value: `\`\`\`js\nx = {${root1}, ${root2}}\`\`\``, inline: false }
				)
				.setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();

			message.channel.send(embed);
		} else {
			let realPart = (-b / (2 * a)).toFixed(2);
			let imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);

			const embed = new MessageEmbed()
				.setColor(message.client.config.discord.accentColor)
				.setTitle('Quadratic Equation Calculation')
				.addFields(
					{ name: 'Input', value: '```js\n' + `${a}x^2 + ${b}x + ${c} = 0` + '\n```', inline: false },
					{ name: 'Output', value: `\`\`\`js\nx = {${realPart} + ${imagPart}i, ${realPart} - ${imagPart}i}\`\`\``, inline: false }
				)
				.setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();

			message.channel.send(embed);
		}
	}
};
