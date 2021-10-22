const fetch = require('node-fetch');
const discord = require('discord.js');
var functions = require('../../utils/functions.js');
const parseMilliseconds = require('pretty-ms');

//If you do not know how GraphQL API works then you wont understand.
var query = `
query ($search: String) { 
Media (search: $search, type: ANIME) { 
 title {
      romaji
      english
      native
    }
   coverImage {
    large
    color
  }
  nextAiringEpisode {
   timeUntilAiring
    episode
  }
  status
  episodes
  isAdult
  genres
  siteUrl
  description
  bannerImage
  }
}
`;

const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'anime',
			aliases: ['ani'],
			group: 'info',
			memberName: 'anime',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get info of an anime.',
			args: [
				{
					key: 'anime',
					prompt: 'You need to provide the anime name.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { anime }) {
		let embed = new discord.MessageEmbed().setAuthor('Please wait...', message.client.user.displayAvatarURL()).setColor('YELLOW');
		let msg = await message.channel.send(embed);

		fetch('https://graphql.anilist.co', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query: query,
				variables: {
					search: anime,
				},
			}),
		})
			.then((data) => data.json())
			.then((json) => {
				json = json.data.Media;

				console.log(json);

				if (!json) {
					const embed = new discord.MessageEmbed().setDescription(message.client.emotes.error + ` - Unable to find anime about \`${anime}\``).setColor('RED');
					return msg.edit(embed);
				}

				embed
					.setAuthor(json.title.english || json.title.romaji, json.coverImage.large)
					.setColor(json.coverImage.color)
					.setDescription(Replacer(json.description).substring(0, 400) + ` [**[Continue](${json.siteUrl})**]`)
					.setImage(json.bannerImage)
					.addField('Genres', json.genres.join(', '))
					.addField('Is 18+', json.isAdult ? 'Yes' : 'No', true)
					.addField('Status', functions.toTitleCase(json.status.replace(/_/g, ' ')), true)
					.setFooter('Anime Hub');

				if (json.nextAiringEpisode) {
					embed.addField('Episode', json.nextAiringEpisode.episode - 1 + '/' + (json.episodes || '--'), true);
					let time = parseMilliseconds(json.nextAiringEpisode.timeUntilAiring * 1000);
					embed.addField('Next Airing', `${time.days}d ${time.hours}h ${time.minutes}m`, true);
				} else {
					if (!json.episodes) {
						embed.addField('Total Episodes', 'None', true);
					} else {
						embed.addField('Total Episodes', json.episodes.toString(), true);
					}
				}
				return msg.edit(embed);
			});
	}
};

function Replacer(string) {
	return string.replace(/<br>/g, '').replace(/<i>/g, '**').replace(/<\/i>/g, '**').replace(/<i\/>/g, '**');
}
