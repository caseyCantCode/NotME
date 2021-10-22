const Memer = require('srod-v2');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'tweet',
			group: 'fun',
			memberName: 'tweet',
			ownerOnly: false,
			guildOnly: true,
			description: 'Returns fake Twitter tweets.',
			argsType: 'multiple',
			args: [
				{
					key: 'user',
					prompt: 'Please specify a user!',
					type: 'member'
				},
				{
					key: 'text',
					prompt: 'Type something please?',
					type: 'string'
				}
			]
		})
	}

	async run(message, { user, text }) {
		var options = {
			Name: user.user.username,
			Tweet: text,
			Color: message.client.config.discord.accentColor,
		};

		const data = await Memer.Tweet(options);

		message.channel.send(data.embed);
	}
};
