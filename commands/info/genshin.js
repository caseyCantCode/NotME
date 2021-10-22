const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const functions = require('../../utils/functions.js');

const types = ['artifacts', 'characters', 'consumables', 'domains', 'elements', 'enemies', 'materials', 'nations', 'weapons'];

const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'genshin',
			aliases: ['gi'],
			group: 'info',
			memberName: 'genshin',
			ownerOnly: false,
			guildOnly: true,
			description: 'Fetch things from Genshin Impact API.',
			args: [
				{
					key: 'type',
					prompt: `Available types are ${types.map((x) => `\`${x}\``).join(', ')}.`,
					type: 'string',
				},
			],
		});
	}

	async run(message, { type }) {
		const current = types.find((x) => x.toLowerCase() === type.toLowerCase());

		if (!current) {
			return message.channel.send(`${message.client.emotes.error} - Invalid type!\nAvailable types are ${types.map((x) => `\`${x}\``).join(', ')}`);
		}

		let embed = new MessageEmbed()
			.setThumbnail('https://cdn.discordapp.com/attachments/869189510423011379/879028993947475968/images.jfif')
			.setAuthor("Genshin Impact's", 'https://cdn.discordapp.com/attachments/869189510423011379/879028998401826886/genshin_logo.png')
			.setColor(message.client.config.discord.accentColor);

		for (const type of types) {
			if (type === current) {
				let jsonData = await fetch(`https://api.genshin.dev/${type}`);
				jsonData = await jsonData.json();

				embed
					.setTitle(functions.toTitleCase(type))
					.setDescription(functions.toTitleCase(jsonData.join(', ').replace(/-s-/g, "'s ").replace(/-/g, ' ').replace(/Of/g, 'of').replace(/To/g, 'to')));
			}
		}

		return message.channel.send(embed).catch((err) => {
			return message.reply(`Something went wrong, please try again later.\n\`\`\`js\n${err}\n\`\`\``);
		});
	}
};
