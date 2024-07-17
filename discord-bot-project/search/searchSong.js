```javascript
const { MessageEmbed } = require('discord.js');
const { searchMusic } = require('./searchMusic');
const { config } = require('../utils/config');

const handleSearchSongCommand = async (message, args) => {
  const searchQuery = args.join(' ');

  if (!searchQuery) {
    return message.reply('Please provide a song title or artist to search for.');
  }

  try {
    const searchResults = await searchMusic(searchQuery);

    if (searchResults.length === 0) {
      return message.reply('No results found for your search.');
    }

    const embed = new MessageEmbed()
      .setTitle('Search Results:')
      .setDescription(
        searchResults
          .map(
            (result, index) =>
              `${index + 1}. **${result.title}** by ${result.artist}\n${
                result.url
              }`
          )
          .join('\n\n')
      )
      .setColor(config.getSetting('embedColor'))
      .setFooter(
        `To play a song, use the command: "${config.getSetting(
          'prefix'
        )}play [song number]"`
      );

    message.channel.send(embed);
  } catch (error) {
    console.error(error);
    message.reply(
      'An error occurred while searching for the song. Please try again later.'
    );
  }
};

module.exports = { handleSearchSongCommand };

```