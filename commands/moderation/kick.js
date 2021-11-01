const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'kick',

			group: 'moderation',
			memberName: 'kick',
			ownerOnly: false,
			guildOnly: true,
			description: 'Kicks some rule-breakers.',
			argsType: 'multiple',
			args: [
				{
					key: 'member',
					prompt: 'Which user do you want to kick?',
					type: 'member',
				},
				{
					key: 'reason',
					prompt: 'For what reason?',
					type: 'string',
					default: 'No reason provided',
				},
			],
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
		});
	}

	async run(message, { member, reason }) {
		if (message.member.roles.highest.position <= member.roles.highest.position) {
			return message.reply(`${this.client.emotes.error} - You can't kick that user because you either have the same role or your role is lower than that user!`);
		}

		member
			.kick(reason)
			.then(() => {
				message.reply(`${this.client.emotes.success} - Kicked **${member.user.tag}** for: \n\`\`\`js\n${reason}\n\`\`\``);
			})
			.catch((err) => {
				return message.channel.send(`${this.client.emotes.error} - **ERROR**\n\`\`\`js\n${err}\n\`\`\``);
			});
	}
};
