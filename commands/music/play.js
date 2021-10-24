const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['p'],
			group: 'music',
			memberName: 'play',
			ownerOnly: false,
			guildOnly: true,
			description: 'Plays a song.',
			args: [
				{
					key: 'query',
					prompt: 'What song do you want to play? (This can be search or URL)',
					type: 'string',
				},
			],
		});
	}

	async run(message, { query }) {
		if (!message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} - You're not connected in any voice channel!`);

		if (queue.voiceChannel && message.member.voice.channel.id !== queue.voiceChannel.id)
			return message.channel.send(`${message.client.emotes.error} - You're not in the same voice channel!`);

		// const queue = message.client.player.createQueue(message.guild, {
		// 	metadata: {
		// 		channel: message.channel,
		// 		message: message,
		// 	},
		// });

		// try {
		// 	if (!queue.connection) await queue.connect(message.member.voice.channel);
		// } catch (err) {
		// 	queue.destroy();
		// 	console.error(err);
		// 	return message.channel.send(`${message.client.emotes.error} - Could not join your voice channel!`);
		// }

		message.channel.send(message.client.emotes.music + ' - Searching `' + query + '`...');

		message.client.player.play(message, query);

		console.log(query.replace(/^\<+|\>+$/g, ''));

		/*
				const num1 = '1️⃣';
				const num2 = '2️⃣';
				const num3 = '3️⃣';
				const num4 = '4️⃣';
				const num5 = '5️⃣';

				msg.react(num1)
					.then(() => msg.react(num2))
					.then(() => msg.react(num3))
					.then(() => msg.react(num4))
					.then(() => msg.react(num5))

				
				const filter = (reaction, user) => {
					return [num1, num2, num3, num4, num5].includes(result.content.toLowerCase()) && user.id === message.author.id;
				};
				*/

		// const filter = (response) => {
		// 	return ['1', '2', '3', '4', '5', 'cancel'].some((answer) => answer.toLowerCase() === response.content.toLowerCase());
		// };

		// await msg.channel
		// 	.awaitMessages(filter, {
		// 		max: 1,
		// 		time: 30000,
		// 		errors: ['time'],
		// 	})
		// 	.then((collected) => {
		// 		const result = collected.first();

		// 		if (result.content === '1') {
		// 			result.react(message.client.emotes.success);
		// 			message.client.player.play(message, songs[0]);
		// 		} else if (result.content === '2') {
		// 			result.react(message.client.emotes.success);
		// 			message.client.player.play(message, songs[1]);
		// 		} else if (result.content === '3') {
		// 			result.react(message.client.emotes.success);
		// 			message.client.player.play(message, songs[2]);
		// 		} else if (result.content === '4') {
		// 			result.react(message.client.emotes.success);
		// 			message.client.player.play(message, songs[3]);
		// 		} else if (result.content === '5') {
		// 			result.react(message.client.emotes.success);
		// 			message.client.player.play(message, songs[4]);
		// 		} else if (result.content === 'cancel') {
		// 			result.react(message.client.emotes.success);
		// 			return message.channel.send(`${message.client.emotes.success} - Search **cancelled**!`);
		// 		} else {
		// 			return message.channel.send(`${message.client.emotes.error} - Invalid position!`);
		// 		}
		// 	})
		// 	.catch(() => {
		// 		msg.delete();
		// 		return message.channel.send(`${message.client.emotes.error} - Timed out!`);
		// 	});
	}
};
