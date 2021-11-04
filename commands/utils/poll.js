const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'poll',
			group: 'util',
			memberName: 'poll',
			ownerOnly: false,
			guildOnly: true,
			description: 'Creates a poll.',
			argsType: 'multiple',
		});
	}

	async run(message, args) {
		if (message.member.roles.highest.position <= this.client.user.roles.highest.position) {
			return message.channel.send(`${this.client.emotes.error} - You're not allowed to do this!`)
		}
		
		await functions.pollEmbed(this.client, message, args[0], args[1], args.slice(2));
	}
};
