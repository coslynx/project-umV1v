```javascript
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'removeFromQueue',
  description: 'Remove a song from the queue',
  execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send('There is nothing playing.');
    }

    if (!args[0]) {
      return message.channel.send('Please provide a valid song number, title, or artist to remove from the queue.');
    }

    let songIndex = parseInt(args[0]);
    if (isNaN(songIndex)) {
      // Search for the song based on title or artist if the input is not a number
      const songToFind = args.join(' ');
      songIndex = serverQueue.songs.findIndex(song => song.title.toLowerCase().includes(songToFind.toLowerCase()) || song.artist.toLowerCase().includes(songToFind.toLowerCase()));
    }

    if (songIndex === -1) {
      return message.channel.send('Song not found in queue.');
    }

    const removedSong = serverQueue.songs.splice(songIndex, 1)[0];

    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Song Removed')
      .setDescription(`${removedSong.title} - ${removedSong.artist} has been removed from the queue.`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
```