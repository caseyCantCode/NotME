const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'ban',

			group: 'moderation',
			memberName: 'ban',
			ownerOnly: false,
			guildOnly: true,
			description: 'Bans some rule-breakers.',
			argsType: 'multiple',
			args: [
				{
					key: 'member',
					prompt: 'Which user do you want to ban? (@user)',
					type: 'member',
				},
				{
					key: 'reason',
					prompt: 'For what reason?',
					type: 'string',
					default: 'No reason provided',
				},
			],
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
		});
	}

	async run(message, { member, reason }) {
		if (message.member.roles.highest.position <= member.roles.highest.position) {
			return message.reply(`${message.client.emotes.error} - You can't ban that user because you either have the same role or your role is lower than that user!`);
		}

		member
			.ban({ reason: reason })
			.then(() => {
				message.reply(`${message.client.emotes.success} - Banned **${member.user.tag}** for: \n\`\`\`js\n${reason}\n\`\`\``);
			})
			.catch((err) => {
				return message.channel.send(`${message.client.emotes.error} - **ERROR**\n\`\`\`js\n${err}\n\`\`\``);
			});
	}
};
