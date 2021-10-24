const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'guess-the-number',
			aliases: ['gtn'],
			group: 'games',
			memberName: 'guess-the-number',
			ownerOnly: false,
			guildOnly: true,
			description: 'guess the number',
		});
	}

	async run(message) {
		await message.client.weky.GuessTheNumber({
			message: message,
			embed: {
				title: 'Guess The Number',
				description: 'You have **{{time}}** to guess the number.',
				color: message.client.config.discord.accentColor,
				footer: 'This is just a game.',
				timestamp: true,
			},
			publicGame: true,
			number: 189,
			time: 60000,
			winMessage: {
				publicGame:
					'GG, The number I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}',
				privateGame: 'GG, The number I guessed was **{{number}}**. You made it in **{{time}}**.',
			},
			loseMessage: 'Better luck next time! The number I guessed was **{{number}}**.',
			bigNumberMessage: 'No {{author}}! My number is greater than **{{number}}**.',
			smallNumberMessage: 'No {{author}}! My number is smaller than **{{number}}**.',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			buttonText: 'Cancel',
			ongoingMessage: "A game is already runnning in <#{{channel}}>. You can't start a new one!",
			returnWinner: false,
		});
	}
};
