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

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!queue) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		if (!args[0]) return message.channel.send(`${message.client.emotes.error} - Please specify a valid filter!`);

		let enabledFilters = queue.filters;

		if (!enabledFilters) enabledFilters = [];

		let disabledFilters = [];

		for (const filter of Object.keys(message.client.player.filters)) {
			disabledFilters.push(filter);
		}

		let filters = [...disabledFilters, ...enabledFilters].unique();

		if (args[0].match(/off|disable/g)) {
			db.set(`${message.guild.id}.musicFilters`, []);

			await queue.setFilter(false);
			return message.channel.send(`${message.client.emotes.off} - Disabled active filters.`);
		}

		let filtersUpdated = [];

		const filterToUpdate = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

		if (!filterToUpdate) return message.channel.send(`${message.client.emotes.error} - This filter doesn't exist!`);

		filtersUpdated.push(filterToUpdate);

		// if (!db.has(`${message.guild.id}.musicFilters.${filterToUpdate}`)) {
		// 	message.channel.send(`${message.client.emotes.music} - I'm **adding** the filter to the queue, please wait... (NOTE: The longer the music is, the longer this will take)`);
		// } else {
		// 	message.channel.send(`${message.client.emotes.music} - I'm **removing** the filter from the queue, please wait... (NOTE: The longer the music is playing, the longer this will take)`);
		// }

		if (!db.has(`${message.guild.id}.musicFilters`) || !enabledFilters.find((x) => x.toLowerCase() === args[0].toLowerCase())) {
			db.push(`${message.guild.id}.musicFilters`, filtersUpdated);

			const result = db.get(`${message.guild.id}.musicFilters`);

			console.log(result);

			await queue.setFilter(result);

			setTimeout(function () {
				message.channel.send(`${message.client.emotes.success} - Successfully added **${filterToUpdate.toLowerCase()}** filter!`);
			}, 900);
		} else {
			const filter1 = enabledFilters.find((x) => x.toLowerCase() === args[0].toLowerCase());

			let curFilters = enabledFilters;

			if (filter1) {
				curFilters.filter((filter2) => {
					return filter2 == filter1;
				});
			}

			db.set(`${message.guild.id}.musicFilters`, curFilters);

			const result = db.get(`${message.guild.id}.musicFilters`);

			console.log(result);

			await queue.setFilter(result);

			setTimeout(function () {
				message.channel.send(`${message.client.emotes.success} - Successfully removed **${filterToUpdate.toLowerCase()}** filter!`);
			}, 900);
		}
	}
};
