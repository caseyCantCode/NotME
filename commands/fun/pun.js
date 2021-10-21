const Memer = require('random-jokes-api');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'pun',
			group: 'fun',
			memberName: 'pun',
			ownerOnly: false,
			guildOnly: true,
			description: 'yes pun',
		})
	}

	async run(message) {
		const meme = Memer.pun();

		const embed = new MessageEmbed().setColor('RANDOM').setDescription(meme);

		message.channel.send({ embeds: [embed] });
	}
};
