```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song'),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guildId);

    if (!queue) {
      return interaction.reply({ content: 'There is no music playing!', ephemeral: true });
    }

    try {
      await queue.skip();
      interaction.reply({ content: 'Skipped the current song!' });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'There was an error skipping the song!', ephemeral: true });
    }
  },
};

```