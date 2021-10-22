const Discord = require('discord.js');
const { default: axios } = require('axios');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'urban',
			aliases: ['urban-dict'],
			group: 'fun',
			memberName: 'urban',
			ownerOnly: false,
			guildOnly: false,
			description: 'A dictionary.',
			args: [
				{
					key: 'text',
					prompt: 'Please specify a word to search for!',
					type: 'string'
				}
			]
		})
	}

	async run(message, { text }) {
		let query = text;

		query = encodeURIComponent(query);

		const {
			data: { list },
		} = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`).catch((err) => {
			return message.channel.send(`${message.client.emotes.error} - **ERROR**\n\`\`\`js\n${err}\n\`\`\``);
		});

		const [answer] = list;

		if (!answer) {
			return message.channel.send(`${message.client.emotes.error} - Unable to find the word!`);
		}

		const embed = new Discord.MessageEmbed()
			.setAuthor('Urban Dictionary', message.message.client.user.displayAvatarURL())
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.setColor(message.client.config.discord.accentColor)
			.addFields(
				{ name: 'Definition', value: `\`\`\`js\n${answer.definition.replace(/[\[\]]/g, '')}\n\`\`\`` },
				{ name: 'Example', value: `\`\`\`\n${answer.example.replace(/[\[\]]/g, '')}\n\`\`\`` }
			)
			.setFooter(`${answer.thumbs_up} 👍 | ${answer.thumbs_down} 👎`)
			.setTimestamp();

		message.channel.send(embed);
	}
};
