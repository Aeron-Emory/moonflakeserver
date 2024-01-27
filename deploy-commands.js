const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [{
  name: 'start',
  description: 'Starts the Minecraft server'
}];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// Replace with your Discord bot's client ID and your server (guild) ID
const clientId = 'client_ID_here';
const guildId = 'server_ID_here';

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error:', error);
  }
})();
