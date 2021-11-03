module.exports = {
	emotes: {
		off: '❌',
		error: '❌',
		warning: '⚠️',
		queue: '📊',
		music: '🎵',
		info: 'ℹ️',
		success: '✅',
	},

	discord: {
		token: process.env.DISCORD_TOKEN,
		ownerID: '540513117222731776',
		prefix: 'me!',
		activityType: 'PLAYING',
		activity: '{p}help',
		accentColor: '#8c9eff',
	},

	filters: ['8d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'],
};
