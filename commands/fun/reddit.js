const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'reddit',
			group: 'fun',
			memberName: 'reddit',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random post from a subreddit.',
			args: [
				{
					key: 'subreddit',
					prompt: 'Invalid subreddit.',
					type: 'string',
				},
				{
					key: 'sort',
					prompt: 'Invalid sort.',
					type: 'string',
					default: 'hot'
				}
			]
		})
	}

	async run(message, { subreddit, sort }) {
		const valid_sorts = ['hot', 'top', 'new'];

		if (!valid_sorts.includes(sort)) sort = 'hot';

		const data = await fetch(`https://www.reddit.com/r/${subreddit}/new.json?sort=${sort}`);

		const res = await data.json();

		const random = Math.floor(Math.random() * 25);

		const embed = new MessageEmbed()
			.setColor(message.client.config.discord.accentColor)
			.setTitle(`${res['data']['children'][random]['data']['title']}`)
			.setURL(`${res['data']['children'][random]['data']['url']}`)
			.setImage(res['data']['children'][random]['data']['url'])
			.setFooter(`A random ${sort.toLowerCase()} post from r/${res['data']['children'][random]['data']['subreddit']}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		return message.channel.send({ embeds: [embed] });
	}
};
