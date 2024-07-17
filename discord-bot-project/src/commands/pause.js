```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the current song.'),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guildId);

    if (!queue) {
      return interaction.reply({ content: 'There is no music playing in this server.' });
    }

    if (queue.connection.paused) {
      return interaction.reply({ content: 'The music is already paused.' });
    }

    queue.connection.pause();
    await interaction.reply({ content: 'Paused the music!' });
  },
};

```