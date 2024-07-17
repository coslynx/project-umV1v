```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the music playback and clears the queue'),
  async execute(interaction) {
    const { client } = interaction;
    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
      return interaction.reply({
        content: 'There is no music playing in this server.',
        ephemeral: true,
      });
    }

    try {
      await queue.destroy();
      interaction.reply({
        content: 'Stopped the music!',
      });
    } catch (error) {
      console.error('Error stopping music:', error);
      interaction.reply({
        content: 'There was an error stopping the music.',
      });
    }
  },
};
```