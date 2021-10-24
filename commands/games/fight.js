const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'fight',
			group: 'games',
			memberName: 'fight',
			ownerOnly: false,
			guildOnly: true,
			description: 'Fight against other members!',
		});
	}

	async run(message) {
		await message.client.weky.Fight({
			message: message,
			opponent: message.mentions.users.first(),
			embed: {
				title: 'Fight',
				color: message.client.config.discord.accentColor,
				footer: 'This is just a game.',
				timestamp: true,
			},
			buttons: {
				hit: 'Hit',
				heal: 'Heal',
				cancel: 'Run Away',
				accept: 'Accept',
				deny: 'Deny',
			},
			acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
			winMessage: 'GG, <@{{winner}}> won the fight!',
			endMessage: "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
			cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
			fightMessage: '{{player}} you go first!',
			opponentsTurnMessage: 'Please wait for your opponents move!',
			highHealthMessage: 'You cannot heal if your HP is above 80!',
			lowHealthMessage: 'You cannot run away if your HP is below 50!',
			returnWinner: false,
			othersMessage: 'Only {{author}} can use the buttons!',
		});
	}
};
