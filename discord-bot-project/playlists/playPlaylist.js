```javascript
const { MessageEmbed } = require('discord.js');
const { getSetting } = require('../utils/config');
const { pool } = require('../database');

const handlePlayPlaylistCommand = async (message, args) => {
  const playlistName = args[0];
  if (!playlistName) {
    return message.reply('Please provide a playlist name.');
  }

  try {
    const result = await pool.query(
      'SELECT * FROM playlists WHERE name = $1 AND server_id = $2',
      [playlistName, message.guild.id],
    );

    if (result.rows.length === 0) {
      return message.reply('Playlist not found.');
    }

    const playlist = result.rows[0];

    const songs = JSON.parse(playlist.songs);

    const queue = message.client.queue.get(message.guild.id);

    if (!queue) {
      // If queue doesn't exist, create it
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: message.member.voice.channel,
        connection: null,
        songs: [],
        volume: getSetting('defaultVolume'),
        playing: true,
        loopSong: false,
        loopPlaylist: false,
        repeatQueue: false,
      };
      message.client.queue.set(message.guild.id, queueConstruct);
    }

    // Add all songs from the playlist to the queue
    songs.forEach((song) => {
      queue.songs.push(song);
    });

    // Start playback if not already playing
    if (!queue.connection) {
      await queue.voiceChannel.join().then((connection) => {
        queue.connection = connection;
        message.client.queue.set(message.guild.id, queue);
        queueConstruct.playing = true;
        message.client.queue.set(message.guild.id, queueConstruct);
        message.reply(`Now playing playlist: ${playlistName}`);
        playMusic(message.guild.id, queue.connection);
      });
    } else {
      message.reply(`Added playlist: ${playlistName} to the queue`);
    }
  } catch (error) {
    console.error('Error playing playlist:', error);
    message.reply('Error playing playlist. Please try again.');
  }
};

const playMusic = async (guildId, connection) => {
  const queue = message.client.queue.get(guildId);

  if (!queue) {
    return;
  }

  if (!queue.songs[0]) {
    // If no songs in queue, leave voice channel
    connection.disconnect();
    message.client.queue.delete(guildId);
    return;
  }

  const song = queue.songs[0];

  // Play the first song in the queue
  const stream = await ytdl(song.url, { filter: 'audioonly' });

  const dispatcher = connection.play(stream, { volume: queue.volume });

  dispatcher.on('finish', () => {
    // Remove song from queue
    queue.songs.shift();

    // Repeat the queue if enabled
    if (queue.repeatQueue) {
      queue.songs.push(song);
    }

    // Check if there are more songs in the queue and play the next one
    if (queue.songs.length > 0) {
      playMusic(guildId, connection);
    } else {
      // If no more songs in queue, leave voice channel
      connection.disconnect();
      message.client.queue.delete(guildId);
    }
  });

  // Update the queue with the current song
  queue.currentTrack = song;
  message.client.queue.set(guildId, queue);

  // Send a message to the text channel indicating the current song
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Now playing: ${song.title}`)
    .setURL(song.url)
    .setThumbnail(song.thumbnail)
    .setDescription(`By ${song.artist}`);
  queue.textChannel.send(embed);
};

module.exports = { handlePlayPlaylistCommand };

```