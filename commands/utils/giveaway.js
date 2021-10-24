const ms = require('ms');

const types = ['start', 'edit', 'reroll', 'delete', 'end', 'pause', 'unpause'];

const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'giveaway',
			aliases: ['g'],
			group: 'util',
			memberName: 'giveaway',
			ownerOnly: false,
			guildOnly: true,
			description: 'Do some giveaways.',
			argsType: 'multiple',
			userPermissions: ['MANAGE_GUILD'],
		});
	}
	async run(message, args) {
		if (!args[0] || !args.length) {
			return message.channel.send(`${message.client.emotes.error} - Missing required argument!\nAvailable actions are: ${types.map((x) => `\`${x}\``).join(', ')}.`);
		}

		if (args[0].toLowerCase() == 'start') {
			if (!args[1] || !args[2] || !args[3]) {
				return message.channel.send(`${message.client.emotes.error} - Missing required argument!\nCorrect usage: \`${message.client.commandPrefix}giveaway start <duration> <winners_count> <prize_name>\`.`);
			}

			const duration = args[1];
			const winnerCount = parseInt(args[2]);
			const prize = args.slice(3).join(' ');

			message.client.giveawaysManager
				.start(message.channel, {
					duration: ms(duration),
					winnerCount,
					prize,
					messages: {
						giveaway: '🎉 **GIVEAWAY** 🎉',
						giveawayEnded: '🎉 **GIVEAWAY ENDED** 🎉',
						drawing: 'Ends {timestamp}',
						embedFooter: '{this.winnerCount} winner(s)',
					},
				})
				.then((gData) => {
					console.log(gData);
				});
		} else if (args[0].toLowerCase() == 'reroll') {
			if (!args[3] || !args[1] || !args[2] || !args[4]) {
				return message.channel.send(`${message.client.emotes.error} - Missing required argument!\nCorrect usage: \`${message.client.commandPrefix}giveaway reroll <giveaway_message_id>\`.`);
			}

			let giveaway = message.client.giveawaysManager.giveaways.find((g) => g.guildId === message.guild.id && g.messageId === args[1]);

			if (!giveaway) return message.channel.send(message.client.emotes.error + ' - Unable to find a giveaway for `' + args.slice(1).join(' ') + '`.');

			const messageId = args[1].toString();
			message.client.giveawaysManager
				.reroll(messageId)
				.then(() => {
					message.channel.send(`${message.client.emotes.success} - Success! Giveaway rerolled!`);
				})
				.catch((err) => {
					message.channel.send(`${message.client.emotes.error} - An error has occurred, please check and try again.\n\`\`\`js\n${err}\n\`\`\``);
				});
		} else if (args[0].toLowerCase() == 'edit') {
			if (!args[3] || !args[1] || !args[2] || !args[4]) {
				return message.channel.send(
					`${message.client.emotes.error} - Missing required argument!\nCorrect usage: \`${message.client.commandPrefix}giveaway edit <giveaway_message_id> <add_time> <new_winners_count> <new_prize_name>\`.`
				);
			}

			let giveaway = message.client.giveawaysManager.giveaways.find((g) => g.guildId === message.guild.id && g.messageId === args[1]);

			if (!giveaway) return message.channel.send(message.client.emotes.error + ' - Unable to find a giveaway for `' + args.slice(1).join(' ') + '`.');

			const messageId = args[1].toString();
			const addTime = args[2];
			const newWinnerCount = args[3];
			const newPrize = args.slice(5).join(' ');

			message.client.giveawaysManager
				.edit(messageId, {
					addTime: parseInt(addTime),
					newWinnerCount: parseInt(newWinnerCount),
					newPrize: newPrize,
				})
				.then(() => {
					message.channel.send(`${message.client.emotes.success} - Success! Giveaway edited!`);
				})
				.catch((err) => {
					message.channel.send(`${message.client.emotes.error} - An error has occurred, please check and try again.\n\`\`\`js\n${err}\n\`\`\``);
				});
		} else if (args[0].toLowerCase() == 'delete') {
			if (!args[1]) {
				return message.channel.send(`${message.client.emotes.error} - Missing required argument!\nCorrect usage: \`${message.client.commandPrefix}giveaway delete <giveaway_message_id>\`.`);
			}

			let giveaway = message.client.giveawaysManager.giveaways.find((g) => g.guildId === message.guild.id && g.messageId === args[1]);

			if (!giveaway) return message.channel.send(message.client.emotes.error + ' - Unable to find a giveaway for `' + args.slice(1).join(' ') + '`.');

			const messageId = args[1].toString();
			message.client.giveawaysManager
				.delete(messageId)
				.then(() => {
					message.channel.send(`${message.client.emotes.success} - Success! Giveaway deleted!`);
				})
				.catch((err) => {
					message.channel.send(`${message.client.emotes.error} - An error has occurred, please check and try again.\n\`\`\`js\n${err}\n\`\`\``);
				});
		} else if (args[0].toLowerCase() == 'end') {
			if (!args[1]) {
				return message.channel.send(`${message.client.emotes.error} - Missing required argument!\nCorrect usage: \`${message.client.commandPrefix}giveaway end <giveaway_message_id>\`.`);
			}

			let giveaway = message.client.giveawaysManager.giveaways.find((g) => g.guildId === message.guild.id && g.messageId === args[1]);

			if (!giveaway) return message.channel.send(message.client.emotes.error + ' - Unable to find a giveaway for `' + args.slice(1).join(' ') + '`.');

			const messageId = args[1].toString();
			message.client.giveawaysManager
				.end(messageId)
				.then(() => {
					message.channel.send(`${message.client.emotes.success} - Success! Giveaway ended!`);
				})
				.catch((err) => {
					message.channel.send(`${message.client.emotes.error} - An error has occurred, please check and try again.\n\`\`\`js\n${err}\n\`\`\``);
				});
		} else if (args[0].toLowerCase() == 'pause') {
			if (!args[1]) {
				return message.channel.send(`${message.client.emotes.error} - Missing required argument!\nCorrect usage: \`${message.client.commandPrefix}giveaway pause <giveaway_message_id>\`.`);
			}

			let giveaway = message.client.giveawaysManager.giveaways.find((g) => g.guildId === message.guild.id && g.messageId === args[1]);

			if (!giveaway) return message.channel.send(message.client.emotes.error + ' - Unable to find a giveaway for `' + args.slice(1).join(' ') + '`.');

			const messageId = args[1].toString();
			message.client.giveawaysManager
				.pause(messageId)
				.then(() => {
					message.channel.send(`${message.client.emotes.success} - Success! Giveaway paused!`);
				})
				.catch((err) => {
					message.channel.send(`${message.client.emotes.error} - An error has occurred, please check and try again.\n\`\`\`js\n${err}\n\`\`\``);
				});
		} else if (args[0].toLowerCase() == 'unpause') {
			if (!args[1]) {
				return message.channel.send(`${message.client.emotes.error} - Missing required argument!\nCorrect usage: \`${message.client.commandPrefix}giveaway unpause <giveaway_message_id>\`.`);
			}

			let giveaway = message.client.giveawaysManager.giveaways.find((g) => g.guildId === message.guild.id && g.messageId === args[1]);

			if (!giveaway) return message.channel.send(message.client.emotes.error + ' - Unable to find a giveaway for `' + args.slice(1).join(' ') + '`.');

			const messageId = args[1].toString();
			message.client.giveawaysManager
				.unpause(messageId)
				.then(() => {
					message.channel.send(`${message.client.emotes.success} - Success! Giveaway un-paused!`);
				})
				.catch((err) => {
					message.channel.send(`${message.client.emotes.error} - An error has occurred, please check and try again.\n\`\`\`js\n${err}\n\`\`\``);
				});
		}
	}
};
