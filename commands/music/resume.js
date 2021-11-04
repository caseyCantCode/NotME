const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'resume',
			group: 'music',
			memberName: 'resume',
			ownerOnly: false,
			guildOnly: true,
			description: 'Resume the paused queue.',
		});
	}

	async run(message) {
		if (message.member.roles.highest.position <= this.client.user.roles.highest.position) {
			return message.channel.send(`${this.client.emotes.error} - You're not allowed to do this!`)
		}
		
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - You're not in the same voice channel !`);

		if (!queue) return message.channel.send(`${this.client.emotes.error} - No music is currently playing!`);

		const success = await queue.resume();

		if (success) message.channel.send(`${this.client.emotes.success} - Song **${queue.songs[0].name}** resumed!`);
	}
};
