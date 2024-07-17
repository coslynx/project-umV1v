```javascript
const { Permissions } = require('discord.js');

/**
 * Checks if a user has the required role to execute a command.
 *
 * @param {Message} message The Discord message object.
 * @param {string} requiredRole The name of the required role.
 * @returns {boolean} True if the user has the required role, false otherwise.
 */
const checkPermissions = (message, requiredRole) => {
  const member = message.member;
  const hasRole = member.roles.cache.some((role) => role.name === requiredRole);

  if (!hasRole) {
    message.reply(`You need the "${requiredRole}" role to use this command.`);
    return false;
  }

  return true;
};

module.exports = { checkPermissions };
```