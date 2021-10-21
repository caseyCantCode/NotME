const Random = require('srod-v2');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'joke',
			group: 'fun',
			memberName: 'joke',
			ownerOnly: false,
			guildOnly: true,
			description: 'Jokes.',
		})
	}

	async run(message) {
		let data = await Random.GetJoke();

		message.channel.send({ embeds: [data.embed] });
	}
};
