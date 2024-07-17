```javascript
const dotenv = require('dotenv');

dotenv.config();

const config = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  databaseUrl: process.env.DATABASE_URL,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  soundcloudClientId: process.env.SOUNDCLOUD_CLIENT_ID,
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  geniusApiKey: process.env.GENIUS_API_KEY,
};

const getSetting = (key) => {
  if (config.hasOwnProperty(key)) {
    return config[key];
  }
  return null;
};

module.exports = {
  config,
  getSetting,
};
```