```javascript
const { MessageEmbed } = require('discord.js');

const handleDisplayQueueCommand = (message) => {
  const queue = message.client.queue.get(message.guild.id);

  if (!queue) {
    return message.channel.send('There is no music playing.');
  }

  const currentTrack = queue.songs[0];
  const upcomingSongs = queue.songs.slice(1);

  const embed = new MessageEmbed()
    .setTitle('Current Queue')
    .setColor('#00ff00')
    .addField('Now Playing', `[${currentTrack.title}](${currentTrack.url})`, true)
    .addField('Upcoming Songs', upcomingSongs.length ? upcomingSongs.map((track, i) => `**${i + 1}.** [${track.title}](${track.url})`).join('\n') : 'No upcoming songs', true)
    .setTimestamp();

  return message.channel.send(embed);
};

module.exports = {
  handleDisplayQueueCommand,
};

```