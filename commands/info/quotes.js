const fetch = require('node-fetch');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'quotes',

			group: 'info',
			memberName: 'quotes',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get random quotes.',
		});
	}

	async run(message) {
		let data = await fetch('https://zenquotes.io/api/random');
		let response = await data.json();

		const embed = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor(message.client.config.discord.accentColor)
			.setDescription(`"${response[0]['q']}"`)
			.setFooter(`A random quote by "${response[0]['a']}"`);

		message.channel.send(embed);
	}
};
