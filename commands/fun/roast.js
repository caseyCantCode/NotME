const Memer = require('random-jokes-api');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'roast',
			group: 'fun',
			memberName: 'roast',
			ownerOnly: false,
			guildOnly: true,
			description: 'ROAST'
		})
	}

	async run(message) {
		const meme = Memer.roast();

		const embed = new MessageEmbed().setColor('RANDOM').setDescription(meme);

		message.channel.send({ embeds: [embed] });
	}
};
