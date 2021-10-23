const fs = require('fs');
const { MessageEmbed, Intents, Collection } = require('discord.js');
const config = require('./utils/config.js');
const DisTube = require('distube');
const functions = require('./utils/functions.js');

const axios = require('axios').default;

const apikey = process.env.HYPIXEL;

const HypixelAPIReborn = require('hypixel-api-reborn');
const hypixelAPIReborn = new HypixelAPIReborn.Client(apikey);

const Commando = require('discord.js-commando');

require('discord-reply');

const client = new Commando.Client({
	owner: config.discord.ownerID,
	commandPrefix: config.discord.prefix,
	disableEveryone: true,
	unknownCommandResponse: false,
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

const neko_client = require('nekos.life');
const neko = new neko_client();

client.nekos = neko;

const { DiscordTogether } = require('discord-together');

client.hypixelAPIReborn = hypixelAPIReborn;
client.HypixelAPIReborn = HypixelAPIReborn;

client.discordInstance = require('discord.js');

client.discordTogether = new DiscordTogether(client);

const db = require('quick.db');
if (!Array.isArray(db.get('giveaways'))) db.set('giveaways', []);

const { GiveawaysManager } = require('discord-giveaways');

const GiveawayManager2 = class extends GiveawaysManager {
	// This function is called when the manager needs to get all giveaways which are stored in the database.
	async getAllGiveaways() {
		// Get all giveaways from the database
		return db.get('giveaways');
	}

	// This function is called when a giveaway needs to be saved in the database.
	async saveGiveaway(messageId, giveawayData) {
		// Add the new giveaway to the database
		db.push('giveaways', giveawayData);
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be edited in the database.
	async editGiveaway(messageId, giveawayData) {
		// Get all giveaways from the database
		const giveaways = db.get('giveaways');
		// Remove the unedited giveaway from the array
		const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageId !== messageId);
		// Push the edited giveaway into the array
		newGiveawaysArray.push(giveawayData);
		// Save the updated array
		db.set('giveaways', newGiveawaysArray);
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be deleted from the database.
	async deleteGiveaway(messageId) {
		// Get all giveaways from the database
		const giveaways = db.get('giveaways');
		// Remove the giveaway from the array
		const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageId !== messageId);
		// Save the updated array
		db.set('giveaways', newGiveawaysArray);
		// Don't forget to return something!
		return true;
	}
};

const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');

client.player = new DisTube.DisTube(client, {
	searchSongs: 6,
	emitNewSongOnly: true,
	plugins: [
		new SpotifyPlugin({
			parallel: true,
			emitEventsAfterFetching: false,
			api: {
				clientId: process.env.SPOTIFY_CLIENTID,
				clientSecret: process.env.SPOTIFY_SECRET,
			},
		}),
		new SoundCloudPlugin(),
	],
});

client.config = config;
client.version = `2.4.7`;
client.emotes = client.config.emotes;
client.filters = client.config.filters;
client.commands = new Collection();
client.snipes = new Collection();

const manager = new GiveawayManager2(client, {
	default: {
		botsCanWin: false,
		embedColor: client.config.discord.accentColor,
		embedColorEnd: client.config.discord.accentColor,
		reaction: '🎉',
	},
});

client.giveawaysManager = manager;

const startDelim = 'latex$';
const endDelim = '$';

// const ascii = require('ascii-table');
// let table = new ascii('Commands');
// table.setHeading('Command', 'Status');

// fs.readdirSync('./commands').forEach((dirs) => {
// 	const commands = fs.readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith('.js'));

// 	for (const file of commands) {
// 		const command = require(`./commands/${dirs}/${file}`);
// 		if (command.name) {
// 			client.commands.set(command.name.toLowerCase(), command);
// 			table.addRow(file, 'Success');
// 		} else {
// 			table.addRow(file, 'Failed');
// 			continue;
// 		}
// 	}
// });

// console.log(table.toString());

client.player.on('playSong', (queue, track) => {
	queue.textChannel.send(`${queue.client.emotes.music} - Now playing **${track.title}** to _${queue.voiceChannel.name}_...`);
});

client.player.on('addSong', (queue, song) => {
	queue.textChannel.send(`${queue.client.emotes.success} - Added **${song.name}** to the queue!`);
});

client.player.on('addList', (queue, playlist) => {
	queue.textChannel.send(`${queue.client.emotes.success} - Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`);
});

client.player.on('searchInvalidAnswer', (message) => message.channel.send(`You answered an invalid number!`));

client.player.on('searchResult', (message, results) => {
	const embed = new MessageEmbed()
		.setColor(message.client.config.discord.accentColor)
		.setTitle(`Choose a song to play`)
		.setFooter("Type the specified song's position in the chat or wait for 60 seconds to cancel")
		.setTimestamp()
		.setDescription(`${results.map((song, i) => `**#${i + 1}** - __${song.name}__ - by [${song.uploader.name}](${song.uploader.url})`).join('\n')}`);

	message.channel.send(embed);
});

client.player.on('searchCancel', (queue) => {
	queue.textChannel.send(`${queue.client.emotes.error} - You did not provide a valid response... Please send the command again!`);
});

// client.player.on('queueEnd', (queue) => {
// 	queue.textChannel.send(`${message.client.emotes.off} - Music stopped as there is no more songs in the queue!`);
// });

// client.player.on('connectionError', (queue, error) => {
// 	queue.textChannel.send(`${message.client.emotes.error} - I'm sorry, something went wrong...\`\`\`js\n${error}\n\`\`\``);
// });

client.player.on('searchNoResult', (message, query) => {
	message.channel.send(`${message.client.emotes.error} - No results found on YouTube for ${query}!`);
});

client.player.on('error', (channel, error) => {
	switch (error) {
		case 'NotPlaying':
			channel.send(`${channel.client.emotes.error} - There is no music being played on this server!`);
			break;
		case 'NotConnected':
			channel.send(`${channel.client.emotes.error} - You're not connected in any voice channel!`);
			break;
		case 'UnableToJoin':
			channel.send(`${channel.client.emotes.error} - I am not able to join your voice channel, please check my permissions!`);
			break;
		case 'MusicStarting':
			channel.send(`The music is starting... Please wait and retry!`);
			break;
		default:
			channel.send(`${message.client.emotes.error} - **ERROR**\`\`\`js\n${error}\n\`\`\``);
	}
});

client.player.on('initQueue', (queue) => {
	queue.autoplay = false;
	queue.volume = 100;
});

client.player.on('empty', (queue) => {
	queue.textChannel.send(`${queue.client.emotes.error} - Music stopped as there is no more members in the voice channel!`);
});

// client.player.on('connectionCreate', (queue, connection) => {
// 	queue.textChannel.send(`${queue.client.emotes.success} - Successfully connected to _**${connection.channel.name}**!_`);
// });

client.player.on('disconnect', (queue) => {
	queue.textChannel.send(`${queue.client.emotes.error} - Music stopped as I have been disconnected from the channel!`);
});

const path = require('path');

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

client.setProvider(sqlite.open({ filename: 'database.db', driver: sqlite3.Database }).then((db) => new Commando.SQLiteProvider(db))).catch(console.error);

client.once('ready', async () => {
	client.registry
		.registerDefaults()
		.registerGroups([
			['music', 'Music'],
			['fun', 'Fun and Games'],
			['math', 'Mathematics'],
			['anime', 'Anime'],
			['nsfw', 'NSFW-only'],
			['info', 'Info'],
			['hypixel', 'Hypixel Stats'],
			['moderation', 'Moderation'],
		])
		.registerCommandsIn(path.join(__dirname, 'commands'));

	console.log(`Logged in as ${client.user.username}. Client ID: ${client.user.id}`);
	console.log(`Ready on ${client.guilds.cache.size} guilds, for a total of ${client.users.cache.size} users`);

	client.user.setActivity(client.config.discord.activity.replace('{p}', client.config.discord.prefix), { type: client.config.discord.activityType });
});

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

client.on('message', async (message) => {
	if (message.author.bot) return;

	if (!db.has(`${message.guild.id}.musicFilters`) || !db.has(`${message.guild.id}.chatbotChannel`) || !db.has(`${message.guild.id}`)) {
		db.set(`${message.guild.id}`, { musicFilters: {}, chatbotChannel: '' });
	}

	const database = db.get(`${message.guild.id}`);

	if (message.content.includes(startDelim) && message.content.includes(endDelim)) {
		const texStrings = message.content.split(startDelim);

		if (texStrings.length !== 1) {
			texStrings.shift();

			const promises = texStrings.map((elem) => {
				const end = elem.indexOf(endDelim),
					tex = elem.slice(0, end);
				return functions.typeset(tex);
			});

			return Promise.all(promises)
				.then((images) => {
					functions.attachImages(message.channel, images, 'LaTeX:');
				})
				.catch((err) => {
					message.channel.send(`${message.client.emotes.error} - **LaTeX Error**\n\`\`\`js\n${err}\n\`\`\``);
				});
		}
	} else {
		if (message.content == '' || message.content.includes('hmm')) return;

		let channel;

		try {
			channel = message.guild.channels.cache.get(database.chatbotChannel);
		} catch {
			return;
		}

		if (channel.id !== message.channel.id) return;

		axios
			.get(`http://api.brainshop.ai/get?bid=158578&key=lK4EO8rZt4hVX5Zb&uid=${functions.makeID(15)}&msg=${encodeURIComponent(message.content)}`)
			.then(async (response) => {
				await sleep(randint(500, 2500));

				console.log(response.data);

				const { cnt } = response.data;

				message.lineReplyNoMention(cnt);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// const data = db.get(`${message.guild.id}`);

	// let prefix = prefix1.getPrefix(message.guild.id);
	// if (!prefix) prefix = client.config.discord.prefix;

	// client.prefix = prefix;

	// if (!message.content.startsWith(prefix)) {
	// 	if (message.mentions.has(client.user)) {
	// 		const args = functions.parseQuotes(message.content.slice((client.user.toString() + ' ').length).trim());

	// 		console.log(args);

	// 		const command = args.shift().toLowerCase();

	// 		console.log(command);

	// 		const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

	// 		if (cmd) {
	// 			if (cmd.ownerOnly === true && cmd.ownerOnly !== null && message.author.id !== client.config.discord.ownerID) {
	// 				return message.channel.send(`${message.client.emotes.error} - This command is for developers only!`);
	// 			}

	// 			cmd.async run(client, message, args);
	// 		}
	// 	} else {
	//		insert commands here
	// 	}
	// } else {
	// 	const args = functions.parseQuotes(message.content.slice(prefix.length).trim());

	// 	console.log(args);

	// 	const command = args.shift().toLowerCase();

	// 	console.log(command);

	// 	const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

	// 	if (cmd) {
	// 		if (cmd.ownerOnly === true && cmd.ownerOnly !== null && message.author.id !== client.config.discord.ownerID) {
	// 			return message.channel.send(`${message.client.emotes.error} - This command is for developers only!`);
	// 		}

	// 		cmd.async run(client, message, args);
	// 	}
	// }
});

process.on('unhandledRejection', (error) => {
	console.error('Unhandled promise rejection:', error);
});

client.on('messageDelete', async (message) => {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		member: message.member,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null,
	});
});

client.on('messageUpdate', async (message) => {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		member: message.member,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null,
	});
});

client.login(client.config.discord.token);
