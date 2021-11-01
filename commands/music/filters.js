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
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - You're not in the same voice channel!`);

		if (!queue) return message.channel.send(`${this.client.emotes.error} - No music is currently playing!`);

		let enabledFilters = queue.filters;
		let disabledFilters = [];

		for (const filter of Object.keys(this.client.player.filters)) {
			disabledFilters.push(filter);
		}

		if (!enabledFilters) enabledFilters = 'None';
		if (!disabledFilters) disabledFilters = 'None';

		console.log(enabledFilters, disabledFilters);

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setTimestamp()
			.setAuthor('List of all filters in use and available of this queue.', this.client.user.displayAvatarURL())
			.setDescription(`Use \`${this.client.commandPrefix}filter <filter>\` to add a filter to this queue.`)
			.addFields({ name: 'Filters in use', value: enabledFilters, inline: true }, { name: 'Available Filters', value: disabledFilters, inline: false })
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
