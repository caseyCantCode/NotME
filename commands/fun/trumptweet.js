const Memer = require('srod-v2');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'trumptweet',
			group: 'fun',
			memberName: 'trumptweet',
			ownerOnly: false,
			guildOnly: true,
			description: 'Returns fake Twitter tweet made by ex-president Donald Trump.',
			args: [
				{
					key: 'text',
					prompt: 'Type something.',
					type: 'string'
				}
			]
		})
	}

	async run(message, { text }) {
		message.react(message.client.emotes.success);

		var options = {
			Tweet: text,
			Color: message.client.config.discord.accentColor,
		};

		const data = await Memer.TrumpTweet(options);

		message.channel.send(data.embed);
	}
};
