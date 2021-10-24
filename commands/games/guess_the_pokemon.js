const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'guess-the-pokemon',
			aliases: ['pokemon-guess', 'gtp'],
			group: 'games',
			memberName: 'guess-the-pokemon',
			ownerOnly: false,
			guildOnly: true,
			description: "Guess the Pokémon based on it's type and abilities.",
		});
	}

	async run(message) {
		await message.client.weky.GuessThePokemon({
			message: message,
			embed: {
				title: 'Guess The Pokémon',
				description: '**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.',
				color: '#5865F2',
				footer: 'pokémon les go',
				timestamp: true,
			},
			thinkMessage: "I'm thinking",
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			winMessage: 'It was a **{{answer}}**! You got it correct in **{{time}}**.',
			loseMessage: 'Better luck next time! It was a **{{answer}}**.',
			time: 60000,
			incorrectMessage: "No, {{author}}! The pokémon isn't `{{answer}}`.",
			buttonText: 'Cancel',
		});
	}
};
