```javascript
const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { getSetting } = require('../utils/config');
const { searchMusic } = require('../utils/search');
const { addToQueue } = require('../queue/addToQueue');
const { startPlayback } = require('../queue/index');
const { checkPermissions } = require('../permissions/roleBasedPermissions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song or adds it to the queue')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('The song or artist to play')
        .setRequired(true)
    ),
  async execute(interaction) {
    const config = getSetting();
    const query = interaction.options.getString('query');
    const requiredRole = config.getSetting('djRole'); // DJ role required to play music
    if (requiredRole && !checkPermissions(interaction, requiredRole)) {
      return interaction.reply({ content: 'You do not have the permission to use this command!', ephemeral: true });
    }

    try {
      const track = await searchMusic(query);
      if (!track) {
        return interaction.reply({ content: 'No results found for that query.' });
      }
      const stream = ytdl(track.url, { filter: 'audioonly' });
      addToQueue(track, stream);
      if (!interaction.client.voice.adapters.get(interaction.guild.id).isPlaying()) {
        startPlayback();
      }
      await interaction.reply(`Added ${track.title} to the queue!`);
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while playing the music.');
    }
  },
};
```