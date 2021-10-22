const Random = require('srod-v2');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'fact',
			group: 'fun',
			memberName: 'fact',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get some fact.',
		});
	}

	async run(message) {
		let data = await Random.GetFact();

		message.channel.send(data.embed);
	}
};
