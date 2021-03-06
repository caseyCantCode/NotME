const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'volume',
			group: 'music',
			memberName: 'volume',
			ownerOnly: false,
			guildOnly: true,
			description: 'Sets volume of a queue.',
			args: [
				{
					key: 'volume',
					prompt: 'What volume do you like to set?',
					type: 'integer',
					validate: (volume) => {
						if (volume <= 100 && volume >= 1) return true;
						return 'Please enter a valid number between 1 and 100!';
					},
				},
			],
		});
	}

	async run(message, { volume }) {
		if (message.member.roles.highest.position <= this.client.user.roles.highest.position) {
			return message.channel.send(`${this.client.emotes.error} - You're not allowed to do this!`)
		}
		
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - You're not in the same voice channel!`);

		if (!queue) return message.channel.send(`${this.client.emotes.error} - No music is currently playing!`);

		const success = queue.setVolume(volume);

		if (success) message.channel.send(`${this.client.emotes.success} - Volume set to **${volume}%**!`);
	}
};
