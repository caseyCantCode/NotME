const Random = require('srod-v2');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'why',
			group: 'fun',
			memberName: 'why',
			ownerOnly: false,
			guildOnly: true,
			description: 'Why?'
		})
	}

	async run(message) {
		let data = await Random.GetWhy({
			Color: 'RANDOM',
		});

		message.channel.send(data.embed);
	}
};
