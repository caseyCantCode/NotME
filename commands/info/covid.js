const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'covid',
			aliases: ['covid19', 'corona'],
			group: 'info',
			memberName: 'covid',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get stats about COVID-19',
			args: [
				{
					key: 'country',
					prompt: 'Please specify a country to get the stats from.',
					type: 'string',
				},
			],
		});
	}
	async run(message, { country }) {
		let embed = new MessageEmbed();

		if (country.match(/all|global|globe|world/gi)) {
			let jsonData = await fetch('https://disease.sh/v3/covid-19/all');
			jsonData = await jsonData.json();
			embed
				.setTitle('Global Cases')
				.setColor(message.client.config.discord.accentColor)
				.setDescription('Sometimes cases number may differ from small amount.')
				.addField('Total Cases', jsonData.cases.toLocaleString(), true)
				.addField('Total Deaths', jsonData.deaths.toLocaleString(), true)
				.addField('Total Recovered', jsonData.recovered.toLocaleString(), true)
				.addField("Today's Cases", jsonData.todayCases.toLocaleString(), true)
				.addField("Today's Deaths", jsonData.todayDeaths.toLocaleString(), true)
				.addField('Active Cases', jsonData.active.toLocaleString(), true);
		} else {
			let jsonData = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
			jsonData = await jsonData.json();

			if (!jsonData.country) return message.reply("I'm unable to get the **" + country + "**'s details.");

			embed
				.setTitle(`${jsonData.country.toUpperCase()}`)
				.setColor(message.client.config.discord.accentColor)
				.setDescription('Sometimes cases number may differ from small amount.')
				.setThumbnail(jsonData.countryInfo.flag || '')
				.addField('Total Cases', jsonData.cases.toLocaleString(), true)
				.addField('Total Deaths', jsonData.deaths.toLocaleString(), true)
				.addField('Total Recovered', jsonData.recovered.toLocaleString(), true)
				.addField("Today's Cases", jsonData.todayCases.toLocaleString(), true)
				.addField("Today's Deaths", jsonData.todayDeaths.toLocaleString(), true)
				.addField('Active Cases', jsonData.active.toLocaleString(), true);
		}
		return message.channel.send(embed).catch((err) => {
			return message.reply('Something went wrong, please try again later.');
		});
	}
};
