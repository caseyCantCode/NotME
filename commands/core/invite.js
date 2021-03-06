const Commando = require('discord.js-commando');

module.exports = class InviteCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'util',
			memberName: 'invite',
			ownerOnly: false,
			guildOnly: false,
			description: 'Invite the bot to your server.',
		});
	}

	async run(message) {
		message.channel.send(
			`${this.client.emotes.info} - Was too lazy to create a proper embed so here you go:\nhttps://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=5758119798`
		);
	}
};
