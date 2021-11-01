const googleIt = require('google-it');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'google',
			aliases: ['gg'],
			group: 'info',
			memberName: 'google',
			ownerOnly: false,
			guildOnly: false,
			description: 'Google it.',
			args: [
				{
					key: 'query',
					prompt: "Don't you want to search something?",
					type: 'string',
				},
			],
		});
	}

	async run(message, { query }) {
		const embed = new MessageEmbed().setTitle('Google Search Results').setColor(this.client.config.discord.accentColor).setTimestamp();

		googleIt({ query: query })
			.then((results) => {
				results.forEach(function (item, index) {
					embed.addField(index + 1 + ': ' + item.title, '<' + item.link + '>');
				});

				message.channel.send(embed);
			})
			.catch((e) => {
				message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
			});
	}
};
