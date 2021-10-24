const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'fast-type',
			group: 'games',
			memberName: 'fast-type',
			ownerOnly: false,
			guildOnly: true,
			description: 'typing goes brrr',
		});
	}

	async run(message) {
		await message.client.weky.FastType({
			message: message,
			embed: {
				title: 'FastTyper',
				description: 'You have **{{time}}** to type the below sentence.',
				color: message.client.config.discord.accentColor,
				footer: 'This is just a game.',
				timestamp: true,
			},
			sentence: 'This is a sentence!',
			winMessage: 'You made it in **{{time}}**.\nYou have a WPM (Words per Minute) of **{{wpm}}**.',
			loseMessage: 'Better luck next time!',
			cancelMessage: 'You ended the game!',
			time: 60000,
			buttonText: 'Cancel',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
		});
	}
};
