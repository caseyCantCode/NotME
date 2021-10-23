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
					prompt: 'what volume do you like to set?',
					type: 'integer',
					validate: (text) => {
						if (text.length <= 100 && text.length >= 1) return true;
						return 'please enter a valid number between 1 and 100!';
					},
				},
			],
		});
	}

	async run(message, { volume }) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		if (!message.client.player.getQueue(message.guild.id)) return message.channel.send(`${message.client.emotes.error} - No music is currently playing!`);

		const queue = message.client.player.getQueue(message.guild.id);

		const success = queue.setVolume(volume);

		if (success) message.channel.send(`${message.client.emotes.success} - Volume set to **${volume}%**!`);
	}
};
