```javascript
const { Client, MessageEmbed } = require('discord.js');
const { searchMusic } = require('../utils/searchMusic');
const { config } = require('../utils/config');

const prefix = config.prefix;

module.exports = {
  name: 'addToQueue',
  description: 'Adds a song to the music queue.',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('You need to be in a voice channel to use this command!');
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    const query = args.join(' ');

    if (!query) {
      return message.reply('You need to provide a song name or URL to add to the queue.');
    }

    try {
      const track = await searchMusic(query);
      if (!track) {
        return message.reply('No results found for that query.');
      }

      if (serverQueue) {
        serverQueue.songs.push(track);
        return message.reply(`${track.title} has been added to the queue!`);
      }

      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [track],
        volume: 1,
        playing: true,
      };

      message.client.queue.set(message.guild.id, queueConstruct);

      try {
        const connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await voiceChannel.leave();
        return message.channel.send(`I could not join the voice channel: ${error}`);
      }
    } catch (error) {
      console.error(error);
      message.reply('There was an error adding the song to the queue.');
    }
  },
};

async function play(guild, song) {
  const serverQueue = guild.client.queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    guild.client.queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection.play(song.stream)
    .on('finish', () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => {
      console.error(error);
      guild.client.queue.delete(guild.id);
      serverQueue.voiceChannel.leave();
    });

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  const embed = new MessageEmbed()
    .setAuthor('Now playing', 'https://i.imgur.com/AfFp7pu.png')
    .setThumbnail(song.thumbnail)
    .setColor('RANDOM')
    .setTitle(`${song.title}`)
    .setDescription(`by ${song.artist}`);

  serverQueue.textChannel.send(embed);
}
```