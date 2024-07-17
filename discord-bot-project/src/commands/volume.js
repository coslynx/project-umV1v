```javascript
const { SlashCommandBuilder } = require('discord.js');
const { getSetting } = require('../utils/config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Adjusts the playback volume')
    .addIntegerOption(option =>
      option.setName('volume')
        .setDescription('Volume level (1-100)')
        .setRequired(true)
    ),
  async execute(interaction) {
    const volume = interaction.options.getInteger('volume');

    if (volume < 1 || volume > 100) {
      return interaction.reply({ content: 'Invalid volume level. Please enter a value between 1 and 100.', ephemeral: true });
    }

    const player = interaction.guild.client.players.get(interaction.guild.id);
    if (!player) {
      return interaction.reply({ content: 'No music is currently playing.', ephemeral: true });
    }

    try {
      await player.setVolume(volume / 100);
      return interaction.reply({ content: `Volume set to ${volume}%` });
    } catch (error) {
      console.error('Error setting volume:', error);
      return interaction.reply({ content: 'An error occurred while setting the volume.', ephemeral: true });
    }
  },
};
```