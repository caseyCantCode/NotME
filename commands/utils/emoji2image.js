const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'emoji2image',
			aliases: ['e2i', 'se', 'emoji'],
			group: 'util',
			memberName: 'emoji2image',
			ownerOnly: false,
			guildOnly: true,
			description: "Gets a specific **custom emoji**'s URL.",
			args: [
				{
					key: 'emoji',
					prompt: 'Which **custom emoji** do you want to use?',
					type: 'custom-emoji',
				},
			],
		});
	}

	async run(message, { emoji }) {
		// if (args[0].match(/<:.+?:\d+>/g)) {
		// 	let emojiName = args[0].match(/:.+?:/g).toString();
		// 	let emojiID = args[0].match(/\d+/g).toString();

		// 	const embed = new MessageEmbed()
		// 		.setTitle(emojiName.toString())
		// 		.setColor(message.client.config.discord.accentColor)
		// 		.setDescription(`Image Size: ${size.toString()}\nURL: [Click here](https://cdn.discordapp.com/emojis/${emojiID.toString()}.png?size=${size.toString()})`)
		// 		.setImage(`https://cdn.discordapp.com/emojis/${emojiID.toString()}.png?size=${size.toString()}`)
		// 		.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
		// 		.setTimestamp();
		// 	return message.channel.send({ embeds: [embed] });
		// } else if (args[0].match(/<a:.+?:\d+>/g)) {
		// let emojiName = args[0].match(/:.+?:/g).toString();
		// let emojiID = args[0].match(/\d+/g).toString();

		const embed = new MessageEmbed()
			.setTitle(emoji.name)
			.setColor(message.client.config.discord.accentColor)
			.setDescription(`URL: [Click here](${emoji.url})`)
			.setImage(emoji.url)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		return message.channel.send({ embeds: [embed] });
		// } else {
		// 	return message.channel.send(`${message.client.emotes.error} - Invalid emoji!`);
		// }
	}
};
