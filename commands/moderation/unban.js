const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'unban',

			group: 'moderation',
			memberName: 'unban',
			ownerOnly: false,
			guildOnly: true,
			description: 'Unbans someone.',
			args: [
				{
					key: 'member',
					prompt: 'specify it or else',
					type: 'string',
				},
			],
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
		});
	}

	async run(message, { member }) {
		const id = member;

		if (!id) {
			return message.channel.send(`${message.client.emotes.error} - Unable to find this user!`);
		}

		const bannedMembers = await message.guild.fetchBans();

		if (!bannedMembers.find((user) => user.user.id === id)) {
			return message.reply(`${message.client.emotes.error} - That user is already unbanned!`);
		}

		message.guild.members.unban(id);
		message.reply(`${message.client.emotes.success} - Unbanned user!`);
	}
};
