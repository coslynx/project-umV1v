```javascript
const { Client, Intents } = require('discord.js');
const { Pool } = require('pg'); // or pg-promise

const config = require('../../utils/config');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });
const pool = new Pool({
  connectionString: config.getSetting('databaseUrl'),
});

module.exports = {
  handleCreatePlaylistCommand(message, args) {
    const playlistName = args.join(' ');

    if (!playlistName) {
      message.reply('Please provide a playlist name!');
      return;
    }

    pool.query('INSERT INTO playlists (name, server_id) VALUES ($1, $2)', [playlistName, message.guild.id])
      .then(() => {
        message.reply(`Playlist "${playlistName}" created successfully!`);
      })
      .catch((error) => {
        console.error('Error creating playlist:', error);
        message.reply('An error occurred while creating the playlist. Please try again later.');
      });
  },
};

```