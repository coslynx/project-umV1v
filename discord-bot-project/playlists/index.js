```javascript
const createPlaylist = require('./createPlaylist');
const addSong = require('./addSong');
const removeSong = require('./removeSong');
const shufflePlaylist = require('./shufflePlaylist');
const playPlaylist = require('./playPlaylist');

module.exports = {
  handleCreatePlaylistCommand: createPlaylist.handleCreatePlaylistCommand,
  handleAddSongCommand: addSong.handleAddSongCommand,
  handleRemoveSongCommand: removeSong.handleRemoveSongCommand,
  handleShufflePlaylistCommand: shufflePlaylist.handleShufflePlaylistCommand,
  handlePlayPlaylistCommand: playPlaylist.handlePlayPlaylistCommand,
};
```