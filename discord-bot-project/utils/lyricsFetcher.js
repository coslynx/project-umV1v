```javascript
const Genius = require('genius-lyrics-api');

const genius = new Genius.Client({
  accessToken: process.env.GENIUS_API_KEY,
});

/**
 * Fetches lyrics for a song using the Genius API.
 *
 * @param {string} songTitle The title of the song.
 * @param {string} artistName The name of the artist.
 * @returns {Promise<string>} The lyrics of the song, or an empty string if no lyrics are found.
 */
async function fetchLyrics(songTitle, artistName) {
  try {
    const searchResults = await genius.search(songTitle);
    const song = searchResults.hits.find((hit) => {
      const title = hit.result.full_title.toLowerCase();
      const artist = hit.result.primary_artist.name.toLowerCase();
      return title.includes(songTitle.toLowerCase()) && artist.includes(artistName.toLowerCase());
    });

    if (song) {
      const lyrics = await song.result.lyrics();
      return lyrics;
    } else {
      return '';
    }
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return '';
  }
}

module.exports = { fetchLyrics };

```