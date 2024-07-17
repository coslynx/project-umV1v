```javascript
const { Client, MessageEmbed } = require('discord.js');

const handleClearQueueCommand = (message) => {
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) {
    return message.channel.send('There is no music playing.').catch(console.error);
  }
  queue.songs = [];
  message.client.queue.set(message.guild.id, queue);

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setDescription('Cleared the queue.');
  return message.channel.send(embed).catch(console.error);
};

module.exports = {
  handleClearQueueCommand,
};

```