const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'roshambo',
			aliases: ['rock-paper-scissors'],
			group: 'games',
			memberName: 'roshambo',
			ownerOnly: false,
			guildOnly: true,
			description: 'Play Rock Paper Scissors with your friend!',
		});
	}

	async run(message) {
		await message.client.weky.RockPaperScissors({
			message: message,
			opponent: message.mentions.users.first(),
			embed: {
				title: 'Roshambo (Rock Paper Scissors)',
				description: 'Press the button below to choose your element.',
				color: message.client.config.discord.accentColor,
				footer: 'roshambo les go',
				timestamp: true,
			},
			buttons: {
				rock: 'Rock',
				paper: 'Paper',
				scissors: 'Scissors',
				accept: 'Accept',
				deny: 'Deny',
			},
			time: 60000,
			acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a game of Roshambo!',
			winMessage: '<@{{winner}}> won!',
			drawMessage: 'This game is deadlock!',
			endMessage: "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
			timeEndMessage: "Both of you didn't pick something in time. So, I dropped the game!",
			cancelMessage: '<@{{opponent}}> refused to have a game of Roshambo with you!',
			choseMessage: 'You picked {{emoji}}',
			noChangeMessage: 'You cannot change your selection!',
			othersMessage: 'Only {{author}} can use the buttons!',
			returnWinner: false,
		});
	}
};
