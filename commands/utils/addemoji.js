const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'addemoji',
			aliases: ['addemote'],
			group: 'util',
			memberName: 'addemoji',
			ownerOnly: false,
			guildOnly: true,
			description: 'Add a custom emoji.',
			clientPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
			userPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
			args: [
				{
					key: 'emojiname',
					prompt: 'Set the emoji name.',
					type: 'string',
				},
				{
					key: 'url',
					prompt: 'Set the emoji image URL.',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, { emojiname, url }) {
		if (message.attachments.first() && url) {
			message.guild.emojis
				.create(url, emojiname)
				.then((emoji) => message.channel.send(`${message.client.emotes.success} - You successfully created an emoji named **${emoji.name}**!`))
				.catch((emoji) => message.channel.send(`${message.client.emotes.error} - Something went wrong trying to create an emoji!\`\`\`js\n${emoji}\n\`\`\``));
		} else if (message.attachments.first()) {
			console.log(message.attachments.first().url);

			message.guild.emojis
				.create(message.attachments.first().url, emojiname)
				.then((emoji) => message.channel.send(`${message.client.emotes.success} - You successfully created an emoji named **${emoji.name}**!`))
				.catch((emoji) => message.channel.send(`${message.client.emotes.error} - Something went wrong trying to create an emoji!\`\`\`js\n${emoji}\n\`\`\``));
		} else if (url) {
			message.guild.emojis
				.create(url, emojiname)
				.then((emoji) => message.channel.send(`${message.client.emotes.success} - You successfully created an emoji named **${emoji.name}**!`))
				.catch((emoji) => message.channel.send(`${message.client.emotes.error} - Something went wrong trying to create an emoji!\`\`\`js\n${emoji}\n\`\`\``));
		}
	}
};
