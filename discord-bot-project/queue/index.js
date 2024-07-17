```javascript
const displayQueue = require('./displayQueue');
const addToQueue = require('./addToQueue');
const removeFromQueue = require('./removeFromQueue');
const clearQueue = require('./clearQueue');

module.exports = {
  handleDisplayQueueCommand: displayQueue.handleDisplayQueueCommand,
  handleAddToQueueCommand: addToQueue.handleAddToQueueCommand,
  handleRemoveFromQueueCommand: removeFromQueue.handleRemoveFromQueueCommand,
  handleClearQueueCommand: clearQueue.handleClearQueueCommand,
};

```