const Discord = require('discord.js');
const mathjax = require('mathjax-node-svg2png');
const ms = require('ms');
const humanizeDuration = require('humanize-duration');
const Attachment = Discord.MessageAttachment;

const defEmojiList = ['\u0031\u20E3', '\u0032\u20E3', '\u0033\u20E3', '\u0034\u20E3', '\u0035\u20E3', '\u0036\u20E3', '\u0037\u20E3', '\u0038\u20E3', '\u0039\u20E3', '\uD83D\uDD1F'];

const embedBuilder = (client, title, author) => {
	return new Discord.MessageEmbed()
		.setColor(client.config.discord.accentColor)
		.setTitle(`${title}`)
		.setFooter(`A poll created by ${author.tag}`, author.displayAvatarURL({ dynamic: true }));
};

module.exports.pollEmbed = async (client, msg, title, timeout, options, emojiList = defEmojiList.slice(), forceEndPollEmoji = '\u2705') => {
	if (!msg && !msg.channel) return msg.inlineReply(`${client.emotes.error} - This channel is inaccessible.`);
	if (!title) return msg.inlineReply(`${client.emotes.error} - Poll title is not given.`);
	if (!options) return msg.inlineReply(`${client.emotes.error} - Poll options is not given.`);
	if (options.length < 2) return msg.inlineReply(`${client.emotes.error} - Please provide more than one choice.`);
	if (options.length > emojiList.length) return msg.inlineReply(`${client.emotes.error} - Please provide ${emojiList.length} or less choices.`);

	let text = `*To vote, react using the corresponding emoji.\nThe poll will end in **${humanizeDuration(
		ms(timeout)
	)}**.\nPoll creator can end the poll **forcefully** by reacting to ${forceEndPollEmoji}.*\n\n`;

	let emojiInfo = {};

	for (const option of options) {
		const emoji = emojiList.splice(0, 1);
		emojiInfo[emoji] = { option: option, votes: 0 };
		text += `${emoji} : \`${option}\`\n\n`;
	}

	const usedEmojis = Object.keys(emojiInfo);
	usedEmojis.push(forceEndPollEmoji);

	const embed = embedBuilder(client, title, msg.author).setDescription(text);
	const poll = await msg.channel.send(embed);
	for (const emoji of usedEmojis) await poll.react(emoji);

	const reactionCollector = poll.createReactionCollector((reaction, user) => usedEmojis.includes(reaction.emoji.name) && !user.bot, timeout === 0 ? {} : { time: ms(timeout) });

	const voterInfo = new Map();

	reactionCollector.on('collect', (reaction, user) => {
		if (usedEmojis.includes(reaction.emoji.name)) {
			if (reaction.emoji.name === forceEndPollEmoji && msg.author.id === user.id) return reactionCollector.stop();

			if (!voterInfo.has(user.id)) voterInfo.set(user.id, { emoji: reaction.emoji.name });

			const votedEmoji = voterInfo.get(user.id).emoji;

			if (votedEmoji !== reaction.emoji.name) {
				const lastVote = poll.reactions.get(votedEmoji);

				lastVote.count -= 1;
				lastVote.users.remove(user.id);

				emojiInfo[votedEmoji].votes -= 1;
				voterInfo.set(user.id, { emoji: reaction.emoji.name });
			}

			emojiInfo[reaction.emoji.name].votes += 1;
		}
	});

	reactionCollector.on('dispose', (reaction, user) => {
		if (usedEmojis.includes(reaction.emoji.name)) {
			voterInfo.delete(user.id);
			emojiInfo[reaction.emoji.name].votes -= 1;
		}
	});

	reactionCollector.on('end', () => {
		text = '*Voting Result:*\n\n';

		for (const emoji in emojiInfo) text += `\`${emojiInfo[emoji].option}\` - \`${emojiInfo[emoji].votes}\` votes\n\n`;

		poll.delete();

		const embed = embedBuilder(client, title, msg.author).setDescription(text);
		msg.channel.send(embed);
	});
};

const typesetColor = 'white';

mathjax.start();

module.exports.toTitleCase = function (string) {
	return string.toString().replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

module.exports.formatBytes = function (bytes, decimals = 2) {
	if (bytes === 0) return '0 B';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

module.exports.shuffle = function (array) {
	var currentIndex = array.length,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
};

module.exports.millisToSeconds = function (millis) {
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return seconds;
};

module.exports.decode = function (encodedString) {
	var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
	var translate = {
		nbsp: ' ',
		amp: '&',
		quot: '"',
		lt: '<',
		gt: '>',
		ouml: 'ö',
		auml: 'ä',
	};
	return encodedString
		.replace(translate_re, function (match, entity) {
			return translate[entity];
		})
		.replace(/&#(\d+);/gi, function (match, numStr) {
			var num = parseInt(numStr, 10);
			return String.fromCharCode(num);
		});
};

module.exports.choice = function (choices) {
	var index = Math.floor(Math.random() * choices.length);
	return choices[index];
};

module.exports.superify = function (input) {
	if (!input) return input;
	var output = [];
	var alphanumeric = /^[a-z0-9]+$/i;
	var i = 0;
	var parens;

	//outer loop for iterating string
	while (i < input.length) {
		var current = input[i++];
		var next = input[i];

		if (current === '^' && next && ((parens = next === '(') || next.match(alphanumeric))) {
			var first = next;

			//start super
			if (!parens) output.push(first);

			//push chars to output until break or string end
			while (i++ < input.length) {
				current = input[i].sup();
				if (parens && current === ')') break;
				if (!parens && !current.match(alphanumeric)) break;
				output.push(current);
			}

			if (!parens) output.push(current);
			i++;
		} else {
			output.push(current);
		}
	}
	return output.join('');
};

module.exports.clean = function (text) {
	if (typeof text === 'string') return text.replace(/\`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	else return text;
};

module.exports.parseQuotes = function (str = '') {
	let current = '',
		arr = [],
		inQuotes = false;

	for (let char of str) {
		if (char == '"') {
			inQuotes = !inQuotes;
		} else if ((char == ' ' || char == '```') && !inQuotes) {
			arr.push(current);
			current = '';
		} else {
			current += char;
		}
	}

	arr.push(current);

	return arr;
};

module.exports.eval = function () {
	return this.toString().replace(/```(.*?)```/g, (match, key) => Function(`return ${key}`)());
};

module.exports.numberWithCommas = function (int) {
	return parseInt(int)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

module.exports.makeID = (length = 10) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

module.exports.typeset = (tex) => {
	return new Promise((resolve, reject) => {
		// mathjax
		// 	.init({
		// 		loader: { load: ['input/tex', 'output/svg'] },
		// 	})
		// 	.then((MathJax) => {
		// 		MathJax.typesetPromise(`$$\\color{${typesetColour}}{${tex}}$$`, { display: true })
		// 			.then(svg2png)
		// 			.then((buffer) => {
		// 				resolve(buffer);
		// 			});
		// 	})
		// 	.catch((err) => {
		// 		reject(err.message);
		// 	});

		const options = {
			math: `\\color{${typesetColor}}{${tex}}`,
			format: 'TeX',
			png: true,
		};

		mathjax.typeset(options, (result) => {
			if (!result.errors) {
				const pngString = result.png.replace(/^data:image\/png;base64,/, ''),
					image = Buffer.from(pngString, 'base64');

				resolve(image);
			} else {
				reject(result.errors);
			}
		});
	});
};

module.exports.attachImages = (channel, images, message = '') => {
	const files = images.map((elem, index) => new Attachment(elem, `file${index}.png`));

	if (!message) {
		channel.send(files);
	} else {
		channel.send(message, files);
	}
};

module.exports.attachImage = (channel, image, message = '') => {
	module.exports.attachImages(channel, [image], message);
};

module.exports.randint = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
