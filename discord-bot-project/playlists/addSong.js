```javascript
const { SlashCommandBuilder } = require('discord.js');
const { getSetting } = require('../utils/config');
const { searchMusic } = require('../search/searchMusic');
const { pool } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addsong')
    .setDescription('Adds a song to a playlist')
    .addStringOption(option =>
      option
        .setName('playlist')
        .setDescription('Name of the playlist to add the song to')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('song')
        .setDescription('Name or URL of the song to add')
        .setRequired(true)
    ),
  async execute(interaction) {
    const playlistName = interaction.options.getString('playlist');
    const songQuery = interaction.options.getString('song');

    try {
      const serverId = interaction.guild.id;
      const searchResults = await searchMusic(songQuery);

      if (searchResults.length === 0) {
        return interaction.reply({ content: 'No results found for that song.', ephemeral: true });
      }

      const [track] = searchResults;

      const insertQuery = `
        INSERT INTO playlist_songs (playlist_id, track_id, track_name, track_artist, track_url)
        SELECT 
          (SELECT id FROM playlists WHERE server_id = $1 AND name = $2),
          $3, $4, $5, $6
        ON CONFLICT (playlist_id, track_id) DO NOTHING;
      `;

      const insertValues = [
        serverId,
        playlistName,
        track.id,
        track.name,
        track.artist,
        track.url,
      ];

      await pool.query(insertQuery, insertValues);

      return interaction.reply({ content: `Added song "${track.name}" to playlist "${playlistName}"`, ephemeral: true });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'An error occurred while adding the song.', ephemeral: true });
    }
  },
};

```