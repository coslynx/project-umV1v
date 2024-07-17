```javascript
const { Client, MessageEmbed } = require('discord.js');
const { getSetting } = require('../utils/config');
const { queryDatabase } = require('../database');

const handleShufflePlaylistCommand = async (message, args) => {
  const playlistName = args[0];
  if (!playlistName) {
    return message.reply('Please provide a playlist name to shuffle.');
  }

  const guildId = message.guild.id;
  const sql = `
    UPDATE playlists
    SET songs = array_shuffle(songs)
    WHERE name = $1 AND guild_id = $2;
  `;
  const values = [playlistName, guildId];
  try {
    await queryDatabase(sql, values);
    const embed = new MessageEmbed()
      .setTitle('Playlist Shuffled')
      .setDescription(`The playlist "${playlistName}" has been shuffled.`)
      .setColor(getSetting('embedColor'));
    message.channel.send(embed);
  } catch (error) {
    console.error('Error shuffling playlist:', error);
    message.reply('There was an error shuffling the playlist. Please try again later.');
  }
};

module.exports = { handleShufflePlaylistCommand };

```