```javascript
const { Client, MessageEmbed } = require('discord.js');
const { getSetting } = require('../utils/config');

module.exports = {
  handleLoopPlaylistCommand: async (message) => {
    const prefix = getSetting('prefix');
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`There is no music playing in this server!`);
    }

    serverQueue.loopPlaylist = !serverQueue.loopPlaylist;
    if (serverQueue.loopPlaylist) {
      return message.channel.send(
        new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`Looping the playlist!`),
      );
    } else {
      return message.channel.send(
        new MessageEmbed()
          .setColor('RED')
          .setDescription(`Looping the playlist disabled!`),
      );
    }
  },
};

```