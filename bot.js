require('dotenv').config();
const { Client, Intents, CommandInteraction } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const exarotonAPIKey = process.env.EXAROTON_API_KEY;
const serverId = 'server_ID_here'; // Replace with your Exaroton server ID

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'start') {
        await handleStartCommand(interaction);
    }
});

async function handleStartCommand(interaction) {
    try {
        const response = await axios.post(`https://api.exaroton.com/v1/server/start/${serverId}`, {}, {
            headers: { 'Authorization': `Bearer ${exarotonAPIKey}` }
        });

        if (response.data.success) {
            await interaction.reply('Minecraft server is starting!');
        } else {
            await interaction.reply('Failed to start the server. Please check server ID and Exaroton API key.');
        }
    } catch (error) {
        console.error('Error starting server:', error);
        await interaction.reply('An error occurred while starting the server.');
    }
}

client.login(process.env.DISCORD_TOKEN);
