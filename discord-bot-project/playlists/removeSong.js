```javascript
const { SlashCommandBuilder } = require('discord.js');
const { getSetting } = require('../utils/config');
const { pool } = require('../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove-song')
    .setDescription('Remove a song from a playlist')
    .addStringOption(option =>
      option.setName('playlist-name')
        .setDescription('The name of the playlist')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('song-title')
        .setDescription('The title or artist of the song')
        .setRequired(true)
    ),
  async execute(interaction) {
    const playlistName = interaction.options.getString('playlist-name');
    const songTitle = interaction.options.getString('song-title');
    const guildId = interaction.guildId;

    try {
      // Check if the playlist exists
      const playlistExistsResult = await pool.query('SELECT 1 FROM playlists WHERE name = $1 AND guild_id = $2', [playlistName, guildId]);
      if (playlistExistsResult.rows.length === 0) {
        return interaction.reply(`Playlist "${playlistName}" not found.`);
      }

      // Remove the song from the playlist
      const removeSongResult = await pool.query(
        'DELETE FROM playlist_songs WHERE playlist_id = (SELECT id FROM playlists WHERE name = $1 AND guild_id = $2) AND song_title = $3',
        [playlistName, guildId, songTitle]
      );

      if (removeSongResult.rowCount === 0) {
        return interaction.reply(`Song "${songTitle}" not found in playlist "${playlistName}".`);
      }

      await interaction.reply(`Successfully removed song "${songTitle}" from playlist "${playlistName}".`);
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      await interaction.reply('An error occurred while removing the song from the playlist.');
    }
  },
};
```