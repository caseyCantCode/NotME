const db = require('quick.db');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'filter',

			group: 'music',
			memberName: 'filter',
			ownerOnly: false,
			guildOnly: true,
			description: 'Sets filters to a queue.',
			argsType: 'multiple',
		});
	}

	async run(message, args) {
		const queue = message.client.player.getQueue(message.guild.id);
		
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (queue.voiceChannel && message.member.voice.channel.id !== queue.voiceChannel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!message.client.player.getQueue(message.guild.id)) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		if (!args[0]) return message.channel.send(`${message.client.emotes.error} - Please specify a valid filter!`);

		let enabledFilters = queue.filters;
		let disabledFilters = message.client.filters;

		let filters;

		if (enabledFilters) filters = disabledFilters.concat(enabledFilters);
		else filters = disabledFilters;

		if (args[0].match(/off|disable/g)) {
			filters.forEach((filter) => {
				if (!db.has(`${message.guild.id}.musicFilters.${filter}`)) return;
				else db.set(`${message.guild.id}.musicFilters.${filter}`, false);
			});

			const result = db.get(`${message.guild.id}.musicFilters`);
			await queue.setFilter(result);
			return message.channel.send(`${message.client.emotes.off} - Disabled active filters.`);
		}

		for (const filter of args) {
			const filterToUpdate = filters.find((x) => x.toLowerCase() === filter.toLowerCase());

			if (!filterToUpdate) return message.channel.send(`${message.client.emotes.error} - This filter doesn't exist!`);

			if (!db.has(`${message.guild.id}.musicFilters.${filterToUpdate}`)) {
				message.channel.send(`${message.client.emotes.music} - I'm **adding** the filter to the queue, please wait... (NOTE: The longer the music is, the longer this will take)`);
			} else {
				message.channel.send(`${message.client.emotes.music} - I'm **removing** the filter from the queue, please wait... (NOTE: The longer the music is playing, the longer this will take)`);
			}

			if (filter.toLowerCase() === filterToUpdate) {
				if (!db.has(`${message.guild.id}.musicFilters.${filterToUpdate}`)) {
					db.set(`${message.guild.id}.musicFilters.${filterToUpdate}`, true);

					const result = db.get(`${message.guild.id}.musicFilters`);

					console.log(result);

					await queue.setFilter(result);

					setTimeout(function () {
						message.channel.send(`${message.client.emotes.success} - Successfully added **${filterToUpdate.toLowerCase()}** filter!`);
					}, 900);
				} else {
					db.set(`${message.guild.id}.musicFilters.${filterToUpdate}`, false);

					const result = db.get(`${message.guild.id}.musicFilters`);

					console.log(result);

					await queue.setFilter(result);

					db.delete(`${message.guild.id}.musicFilters.${filterToUpdate}`);

					setTimeout(function () {
						message.channel.send(`${message.client.emotes.success} - Successfully removed **${filterToUpdate.toLowerCase()}** filter!`);
					}, 900);
				}
			}
		}
	}
};
