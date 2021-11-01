const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');

const difficultyLevels = ['easy', 'medium', 'hard'];
const questionTypes = ['multiple', 'boolean'];

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'quiz',
			group: 'fun',
			memberName: 'quiz',
			ownerOnly: false,
			guildOnly: false,
			description: 'Asks you a question.',
			args: [
				{
					key: 'difficulty',
					prompt: 'Invalid difficulty.',
					type: 'string',
					default: functions.choice(difficultyLevels),
				},
				{
					key: 'type',
					prompt: 'Invalid difficulty.',
					type: 'string',
					default: functions.choice(questionTypes),
				},
			],
		});
	}

	async run(message, { difficulty, type }) {
		let questionType;
		let difficultyLevel;

		difficultyLevel = difficulty;

		questionType = type;

		const response = await fetch(`https://opentdb.com/api.php?amount=20&difficulty=${difficultyLevel}&type=${questionType}`);
		const data = await response.json();
		var length = data.results.length;

		var random = Math.floor(Math.random() * length);
		var questions = data.results[random];
		var category = questions.category;
		var type = questions.type;
		var difficulty = questions.difficulty;
		var question = functions.decode(questions.question);
		var correctAnswer = questions.correct_answer;
		var totalAnswers = questions.incorrect_answers;

		totalAnswers.push(correctAnswer);

		functions.shuffle(totalAnswers);

		if (type === 'boolean') type = 'True/False';

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setAuthor(`Basically a quiz`, message.author.displayAvatarURL({ dynamic: true }))
			.setTitle(question)
			.setDescription(`Category: ${category}\nType: ${functions.toTitleCase(type)}\nDifficulty: ${functions.toTitleCase(difficulty)}`);

		if (type.toLowerCase() === 'multiple') {
			embed.addFields(
				{ name: 'A', value: functions.decode(totalAnswers[0]), inline: false },
				{ name: 'B', value: functions.decode(totalAnswers[1]), inline: false },
				{ name: 'C', value: functions.decode(totalAnswers[2]), inline: false },
				{ name: 'D', value: functions.decode(totalAnswers[3]), inline: false }
			);

			embed.setFooter("Type either A, B, C, D or type 'cancel' to cancel.");

			let msg = await message.channel.send(embed);

			const filter = (response) => {
				return ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'cancel'].some((answer) => answer.toLowerCase() === response.content.toLowerCase());
			};

			await msg.channel
				.awaitMessages(filter, {
					max: 1,
					time: 30000,
					errors: ['time'],
				})
				.then((response) => {
					const result = response.first();

					if (result.content.toLowerCase() === 'a') {
						if (totalAnswers[0] === correctAnswer) {
							message.channel.send(`${this.client.emotes.success} - Correct!`);
						} else {
							message.react('❌');
							message.channel.send(`${this.client.emotes.error} - Incorrect!\nThe correct answer is: **${correctAnswer}**!`);
						}
					} else if (result.content.toLowerCase() === 'b') {
						if (totalAnswers[1] === correctAnswer) {
							message.channel.send(`${this.client.emotes.success} - Correct!`);
						} else {
							message.react('❌');
							message.channel.send(`${this.client.emotes.error} - Incorrect!\nThe correct answer is: **${correctAnswer}**!`);
						}
					} else if (result.content.toLowerCase() === 'c') {
						if (totalAnswers[2] === correctAnswer) {
							message.channel.send(`${this.client.emotes.success} - Correct!`);
						} else {
							message.react('❌');
							message.channel.send(`${this.client.emotes.error} - Incorrect!\nThe correct answer is: **${correctAnswer}**!`);
						}
					} else if (result.content.toLowerCase() === 'd') {
						if (totalAnswers[3] === correctAnswer) {
							message.channel.send(`${this.client.emotes.success} - Correct!`);
						} else {
							message.react('❌');
							message.channel.send(`${this.client.emotes.error} - Incorrect!\nThe correct answer is: **${correctAnswer}**!`);
						}
					} else if (result.content.toLowerCase() === 'cancel') {
						return message.channel.send(`${this.client.emotes.error} - Cancelled!`);
					} else {
						message.react('❌');
						return message.channel.send(`${this.client.emotes.error} - Incorrect!\nThe correct answer is: **${correctAnswer}**!`);
					}
				});
		} else if (type.toLowerCase() === 'true/false') {
			embed.addFields({ name: '1', value: totalAnswers[0], inline: false }, { name: '2', value: totalAnswers[1], inline: false });

			embed.setFooter("Type either 1 or 2 or type 'cancel' to cancel.");

			let msg = await message.channel.send(embed);

			const filter = (response) => {
				return ['1', '2', 'cancel'].some((answer) => answer.toLowerCase() === response.content.toLowerCase());
			};

			await msg.channel
				.awaitMessages(filter, {
					max: 1,
					time: 30000,
					errors: ['time'],
				})
				.then((response) => {
					const result = response.first();

					if (result.content.toLowerCase() === '1') {
						if (totalAnswers[0] === correctAnswer) {
							message.channel.send(`${this.client.emotes.success} - Correct!`);
						} else {
							message.react('❌');
							message.channel.send(`${this.client.emotes.error} - Incorrect!\nThe correct answer is: **${correctAnswer}**!`);
						}
					} else if (result.content.toLowerCase() === '2') {
						if (totalAnswers[1] === correctAnswer) {
							message.channel.send(`${this.client.emotes.success} - Correct!`);
						} else {
							message.react('❌');
							message.channel.send(`${this.client.emotes.error} - Incorrect!\nThe correct answer is: **${correctAnswer}**!`);
						}
					} else if (result.content.toLowerCase() === 'cancel') {
						return message.channel.send(`${this.client.emotes.error} - Cancelled!`);
					} else {
						message.react('❌');
						return message.channel.send(`${this.client.emotes.error} - Incorrect!\nThe correct answer is: **${correctAnswer}**!`);
					}
				});
		}
	}
};
