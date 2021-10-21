const Commando = require('discord.js-commando');

module.exports = class InviteCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'util',
			memberName: 'botinfo',
			ownerOnly: false,
			guildOnly: true,
			description: 'Invite the bot to your server.',
		});
	}

	async run(message) {
		message.channel.send(
			`${message.client.emotes.info} - Was too lazy to create a proper embed so here you go:\nhttps://discord.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=7624589159`
		);
	}
};
