// Load dependencies
const Discord = require('discord.js');
const latinize = require('latinize');

// Load config
const config = require('./config.json');

// Create alot bot
const client = new Discord.Client();

// Log to console when alot bot is ready
client.on('ready', () => {
	console.log('alot is ready and waiting');
});

client.on('message', (msg) => {
	// Check messages for certain ways "alot" is said
	if (
		// latinize makes sure any diacritics are converted to regular latin characters
		latinize(msg.content).toLowerCase().includes('alot')
		// Knightman can't escape the bot
		|| (latinize(msg.content).toLowerCase().includes('a lot') && msg.author.id == config.knightmanId)
		// alot is self-aware (because otherwise it won't react to mention of its own name, stupid alot)
		|| msg.isMentioned(client.user)
	) {
		try {
			// add the reaction
			msg.react(msg.guild.emojis.get(config.alotEmojiId));
			// log it to the console
			console.log(`Reacted: "${msg.content}" by ${msg.author.username}`);
		} catch (error) {
			// idk how to error
			console.error('alot failed');
		}
	}
});

// login boi
client.login(config.token);