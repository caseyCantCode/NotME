const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'shuffle',
			group: 'music',
			memberName: 'shuffle',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shuffle song positions of a queue.',
		});
	}

	async run(message) {
		if (message.member.roles.highest.position <= this.client.user.roles.highest.position) {
			return message.channel.send(`${this.client.emotes.error} - You're not allowed to do this!`)
		}
		
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - You're not in the same voice channel!`);

		if (!queue) return message.channel.send(`${this.client.emotes.error} - No music is currently playing!`);

		const success = await queue.shuffle();

		if (success) message.channel.send(`${this.client.emotes.success} - Queue shuffled **${queue.songs.length}** song(s)!`);
	}
};
