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
			guildOnly: true,
			description: 'Get information about weather of a specific location.',
			args: [
				{
					key: 'place',
					prompt: "Weather location cannot be empty!",
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
						.setAuthor('Weather Forecast', message.client.user.displayAvatarURL())
						.setTitle(`${result[0].location.name}`)
						.setColor(message.client.config.discord.accentColor)
						.setDescription('Temperature units can may be differ sometimes')
						.addField('Temperature', `${result[0].current.temperature}°C`, true)
						.addField('Sky Status', result[0].current.skytext, true)
						.addField('Humidity', `${result[0].current.humidity}%`, true)
						.addField('Wind Speed', result[0].current.windspeed, true) //What about image
						.addField('Observation Time', result[0].current.observationtime, true)
						.addField('Wind Display', result[0].current.winddisplay, true)
						.setThumbnail(result[0].current.imageUrl);
					message.channel.send(embed);
				} catch (err) {
					return message.channel.send(`${message.client.emotes.error} - Unable to get the data of given location!`);
				}
			}
		);
	}
};
