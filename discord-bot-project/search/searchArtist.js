```javascript
const { MessageEmbed } = require('discord.js');
const { searchMusic } = require('./utils');
const { getSetting } = require('../utils/config');

const handleSearchArtistCommand = async (message, args) => {
  const artistName = args.join(' ');

  if (!artistName) {
    message.reply('Please provide an artist name to search for.');
    return;
  }

  try {
    const searchResults = await searchMusic(artistName);

    if (searchResults.length === 0) {
      message.reply(`No results found for artist: ${artistName}`);
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(`Search Results for Artist: ${artistName}`)
      .setColor(getSetting('embedColor'));

    searchResults.forEach((result, index) => {
      embed.addField(
        `${index + 1}. ${result.title} - ${result.artist}`,
        `[${result.platform}](${result.url})`,
        true
      );
    });

    message.channel.send(embed);
  } catch (error) {
    console.error('Error searching for artist:', error);
    message.reply('An error occurred while searching for the artist.');
  }
};

module.exports = {
  handleSearchArtistCommand,
};

```