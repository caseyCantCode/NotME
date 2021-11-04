const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'disconnect',
			aliases: ['dis', 'leave'],
			group: 'music',
			memberName: 'disconnect',
			ownerOnly: false,
			guildOnly: true,
			description: 'Disconnects from current voice channel.',
		});
	}

	async run(message) {
		if (message.member.roles.highest.position <= this.client.user.roles.highest.position) {
			return message.channel.send(`${this.client.emotes.error} - You're not allowed to do this!`)
		}
		
		if (!message.guild.me.voice.channel) return message.channel.send(`${this.client.emotes.error} - I'm not connected in any voice channel!`);

		const success = await message.guild.me.voice.channel.leave();

		if (success) message.channel.send(`${this.client.emotes.success} - I have been **disconnected** from this channel!`);
	}
};
