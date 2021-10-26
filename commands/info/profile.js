const { MessageAttachment } = require('discord.js');
const Commando = require('discord.js-commando');
const { Canvas } = require('canvas-constructor/skia');
const { resolveImage } = require('canvas-constructor/skia');
const { registerFont } = require('canvas-constructor/skia');
const { resolve, join } = require('path');
const fetch = require('node-fetch');

registerFont('Discord', resolve(join(__dirname, '../../discord.otf')));

const imageUrlRegex = /\?size=2048$/g;

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'profile',
			group: 'info',
			memberName: 'profile',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shows your profile.',
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to use with?',
					type: 'member',
				},
			],
		});
	}

	async run(message, { user }) {
		async function profile(member, key) {
			const { level, points } = message.client.points.get(key);

			try {
				const url = member.user.displayAvatarURL().replace('.webp', '.png').replace(imageUrlRegex, '?size=128');
				console.log(url);
				const result = await fetch(url);
				if (!result.ok) throw new Error('Failed to get the avatar.');
				console.log(result);
				const buffer = await result.buffer();
				console.log(buffer);
				const avatar = await resolveImage(buffer);

				const name = member.user.tag.length > 20 ? member.user.tag.substring(0, 17) + '...' : member.user.tag;

				return new Canvas(400, 180)
					.setColor('#7289DA')
					.printRectangle(84, 0, 316, 180)
					.setColor('#2C2F33')
					.printRectangle(0, 0, 84, 180)
					.printRectangle(169, 26, 231, 46)
					.printRectangle(224, 108, 176, 46)
					.setShadowColor('rgba(22, 22, 22, 1)')
					.setShadowOffsetY(5)
					.setShadowBlur(10)
					.printCircle(84, 90, 62)
					.printCircularImage(avatar, 84, 90, 64)
					.save()
					.createRoundedClip(20, 138, 128, 32, 5)
					.setColor('#23272A')
					.fill()
					.restore()
					.setTextAlign('center')
					.setTextFont('10pt Discord')
					.setColor('#FFFFFF')
					.printText(name, 285, 54)
					.printText(`Level: ${level.toLocaleString()}`, 84, 159)
					.setTextAlign('left')
					.printText(`XP: ${points.toLocaleString()}`, 241, 136)
					.toBuffer();
			} catch (error) {
				message.channel.send(`Something happened: \`${error.message}\``);
				console.error(error);
			}
		}

		const key = `${message.guild.id}-${user.user.id}`;

		message.client.points.ensure(`${message.guild.id}-${user.user.id}`, {
			user: user.user.id,
			guild: message.guild.id,
			points: 0,
			level: 1,
		});

		const buffer = await profile(user, key);
		const filename = `profile-${user.user.id}.jpg`;
		const attachment = new MessageAttachment(buffer, filename);

		message.channel.send({ files: [attachment] });
	}
};
