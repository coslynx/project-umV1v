```javascript
const { Client, MessageEmbed } = require('discord.js');
const config = require('../../utils/config');

module.exports = {
  name: 'repeatQueue',
  description: 'Toggles repeating the entire queue.',
  execute(message) {
    const client = new Client(); // Create a Discord client instance

    const queue = message.client.queue.get(message.guild.id); // Get the queue for the current server

    if (!queue) return message.channel.send('There is no queue to repeat!'); // If there's no queue, send an error message

    queue.repeatQueue = !queue.repeatQueue; // Toggle the repeatQueue flag for the queue

    const embed = new MessageEmbed()
      .setColor(config.embedColor)
      .setDescription(`Queue repeating is now **${queue.repeatQueue ? 'on' : 'off'}**`); // Set the description based on the repeat state

    return message.channel.send(embed); // Send the embed message
  },
};

```