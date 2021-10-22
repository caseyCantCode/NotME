const humanize = require('humanize-duration');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class UptimeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'uptime',
			group: 'util',
			memberName: 'uptime',
			ownerOnly: false,
			guildOnly: true,
			description: "Shows the bot's uptime.",
		});
	}

	async run(client, message) {
		message.react(message.client.emotes.success);

		const embed = new MessageEmbed().setColor(message.client.config.discord.accentColor).setAuthor('Bot uptime', message.client.user.displayAvatarURL()).setTitle(humanize(client.uptime));

		message.channel.send(embed);
	}
};
