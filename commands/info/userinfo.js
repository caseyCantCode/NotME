const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const functions = require('../../utils/functions.js');
const translate = require('@iamtraction/google-translate');
const Commando = require('discord.js-commando');

module.exports = class UserInfo extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'userinfo',
			aliases: ['whois', 'user'],
			group: 'info',
			memberName: 'userinfo',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get information about a specific user across Discord (Yes, Discord, not within the server).',
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'user',
				},
			],
		});
	}

	async run(message, { user }) {
		// let stat = {
		// 	online: 'https://emoji.gg/assets/emoji/9166_online.png',
		// 	idle: 'https://emoji.gg/assets/emoji/3929_idle.png',
		// 	dnd: 'https://emoji.gg/assets/emoji/2531_dnd.png',
		// 	offline: 'https://emoji.gg/assets/emoji/7445_status_offline.png',
		// };

		let badges = await user.flags;
		badges = (await badges) ? badges.toArray() : ['None'];

		let newbadges = [];
		badges.forEach((m) => {
			newbadges.push(m.replace('_', ' '));
		});

		const embed = new MessageEmbed().setThumbnail(
			user.displayAvatarURL({
				dynamic: true,
			}) ||
				user.user.displayAvatarURL({
					dynamic: true,
				})
		);

		if (user.displayHexColor) embed.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor);
		else embed.setColor(message.client.config.discord.accentColor);

		embed.setAuthor(
			user.tag,
			user.displayAvatarURL({
				dynamic: true,
			})
		);

		axios
			.get(`https://discord.com/api/users/${user.id}`, {
				headers: {
					Authorization: `Bot ${message.client.config.discord.token}`,
				},
			})
			.then((res) => {
				console.log(res);

				const { banner } = res.data;

				if (banner) {
					const extension = banner.startsWith('a_') ? '.gif' : '.png';
					const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;

					embed.setImage(url);
				}
			});

		let isInThisGuild;

		if (user.username.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/g)) {
			let translated = await translate(user.username, { from: 'ja', to: 'en' });
			embed.addField('Translated Username', translated.text);
		}

		embed.addField('Account created at', moment(user.createdAt).format('LLLL'));

		await message.guild.members
			.fetch(user)
			.then(async (user) => {
				let array = [];
				let array1 = [];

				if (user.presence) {
					if (user.presence.activities.length) {
						let data = user.presence.activities;

						for (let i = 0; i < data.length; i++) {
							console.log(data[i]);

							let name = data[i].name || 'None';
							let xname = data[i].details || 'None';
							let yname = data[i].state || 'None';
							let zname;

							if (data[i].assets) {
								zname = data[i].assets.largeText;
							} else {
								zname = 'None';
							}

							let type = data[i].type;

							if (type === 'LISTENING') {
								array.push(functions.toTitleCase(type.toString()) + ' to ' + name.toString());
								array1.push(`**Song** -> ${xname}\n**Artist** -> ${yname}\n**Album** -> ${zname}`);
							} else if (type === 'CUSTOM') {
								array.push(name.toString());
								array1.push(`${yname}`);
							} else {
								array.push(functions.toTitleCase(type.toString()) + ' ' + name.toString());
								array1.push(`${xname}\n${yname}`);
							}

							if (data[i].name === 'Spotify') {
								embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace('spotify:', '')}`);
							}

							embed.addField(array[i], array1[i], false);
						}
					}
				}

				isInThisGuild = 'Yes';

				embed.addField('Is in this server', isInThisGuild);

				embed.addField('Joined this server at', moment(user.joinedAt).format('LLLL'));

				if (user.nickname) {
					embed.addField('Server Nickname', user.nickname);
					if (user.nickname.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/g)) {
						let translated = await translate(user.nickname, { from: 'ja', to: 'en' });
						embed.addField('Translated Nickname', translated.text);
					}
				}
			})
			.catch(() => {
				isInThisGuild = 'No';

				embed.addField('Is in this server', isInThisGuild);
			});

		embed
			.addField('Common Information', `ID: \`${user.id}\`\nDiscriminator: ${user.discriminator}\nBot: ${user.bot ? 'Yes' : 'No'}`)
			.addField('Badges', functions.toTitleCase(newbadges.join(', ')) || 'None')
			.setFooter(
				`Requested by ${message.author.tag}`,
				message.author.displayAvatarURL({
					dynamic: true,
				})
			)
			.setTimestamp();

		return message.channel.send(embed).catch((err) => {
			return message.channel.send('Error: ' + err);
		});
	}
};
