const Random = require('srod-v2');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class AdviceCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'advice',
			group: 'fun',
			memberName: 'advice',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get a random advice.',
		});
	}

	async run(message) {
		let data = await Random.GetAdvice();

		message.channel.send(data.embed);
	}
};
