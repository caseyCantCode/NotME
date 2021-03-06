const weather = require('weather-js');
const discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'weather',
			group: 'info',
			memberName: 'weather',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get information about weather of a specific location.',
			args: [
				{
					key: 'place',
					prompt: 'What place do you want to get the information from?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { place }) {
		weather.find(
			{
				search: place,
				degreeType: 'C',
			},
			(err, result) => {
				try {
					let embed = new discord.MessageEmbed()
						.setAuthor('Weather Forecast', this.client.user.displayAvatarURL())
						.setTitle(`${result[0].location.name}`)
						.setColor(this.client.config.discord.accentColor)
						.setDescription('Temperature units can may be differ sometimes')
						.addField('Temperature', `${result[0].current.temperature}°C`, true)
						.addField('Sky Status', result[0].current.skytext, true)
						.addField('Humidity', `${result[0].current.humidity}%`, true)
						.addField('Wind Speed', result[0].current.windspeed, true)
						.addField('Observation Time', result[0].current.observationtime, true)
						.addField('Wind Display', result[0].current.winddisplay, true)
						.setThumbnail(result[0].current.imageUrl);
					message.channel.send(embed);
				} catch (err) {
					return message.channel.send(`${this.client.emotes.error} - Unable to get the data of given location!`);
				}
			}
		);
	}
};
