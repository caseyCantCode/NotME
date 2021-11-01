const { join } = require('bluebird');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'filters',
			aliases: ['q-filters'],
			group: 'music',
			memberName: 'filters',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shows current filters of a queue.',
		});
	}

	async run(message) {
		let disabledFilters = [];

		for (const filter of Object.keys(this.client.player.filters)) {
			disabledFilters.push(filter);
		}
		
		if (!disabledFilters) disabledFilters = 'None';

		console.log(disabledFilters);

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setTimestamp()
			.setTitle('Available Music Filters')
			.setThumbnail(this.client.user.displayAvatarURL())
			.setDescription(disabledFilters.map(x => `\`${x}\``).join(', '))
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
