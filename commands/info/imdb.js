const discord = require('discord.js');
const fetch = require('node-fetch');
const functions = require('../../utils/functions.js');

const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'imdb',
			aliases: ['film', 'movie', 'series'],
			group: 'info',
			memberName: 'imdb',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get information about a specific movie or film or series.',
			args: [
				{
					key: 'query',
					prompt: 'What movie/film/series do you want to know about?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { query }) {
		const embed0 = new discord.MessageEmbed().setAuthor('Please wait...', this.client.user.displayAvatarURL()).setColor('YELLOW');
		let msg = await message.channel.send(embed0);
		try {
			let movie = await fetch(`https://www.omdbapi.com/?apikey=5e36f0db&t=${query.replace(' ', '+')}`);
			movie = await movie.json();

			if (!movie.Response) {
				const embed = new discord.MessageEmbed().setDescription(this.client.emotes.error + ' - Unable to find something about `' + args.join(' ') + '`').setColor('RED');
				return msg.edit(embed);
			}

			const embed = new discord.MessageEmbed()
				.setTitle(movie.Title)
				.setColor(this.client.config.discord.accentColor)
				.setThumbnail(movie.Poster)
				.setDescription(movie.Plot)
				.setFooter(`Ratings: ${movie.imdbRating} | Seasons: ${movie.totalSeasons || '0'}`)
				.addField('Country', movie.Country, true)
				.addField('Languages', movie.Language, true)
				.addField('Type', functions.toTitleCase(movie.Type), true);
			msg.edit(embed);
		} catch (err) {
			const embed = new discord.MessageEmbed().setDescription('Something went wrong :/').setColor('RED');
			msg.edit(embed);
		}
	}
};
