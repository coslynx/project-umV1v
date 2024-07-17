```javascript
const { Client, MessageEmbed } = require('discord.js');

const client = new Client();

const loopSong = {
  loopSong: false, // Keeps track of whether loop is on or off
  toggleLoop() {
    this.loopSong = !this.loopSong; // Toggles the loop state
  },
  getLoopState() {
    return this.loopSong; // Returns the current loop state
  }
};

module.exports = {
  handleLoopSongCommand(message) {
    if (loopSong.getLoopState()) {
      // Loop is on, so turn it off
      loopSong.toggleLoop();
      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Song Loop Disabled');
      message.channel.send(embed);
    } else {
      // Loop is off, so turn it on
      loopSong.toggleLoop();
      const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Song Loop Enabled');
      message.channel.send(embed);
    }
  }
};

```