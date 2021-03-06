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
					prompt: 'Which user do you want to unban? (userID)',
					type: 'string',
				},
			],
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
		});
	}

	async run(message, { member }) {
		if (message.member.roles.highest.position <= this.client.user.roles.highest.position) {
			return message.channel.send(`${this.client.emotes.error} - You're not allowed to do this!`)
		}
		
		const id = member;

		if (!id) {
			return message.channel.send(`${this.client.emotes.error} - Unable to find this user!`);
		}

		const bannedMembers = await message.guild.fetchBans();

		if (!bannedMembers.find((user) => user.user.id === id)) {
			return message.reply(`${this.client.emotes.error} - That user is already unbanned!`);
		}

		message.guild.members.unban(id);
		message.reply(`${this.client.emotes.success} - Unbanned user!`);
	}
};
