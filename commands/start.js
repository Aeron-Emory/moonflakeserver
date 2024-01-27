const axios = require('axios');

module.exports = {
    name: 'start',
    description: 'Starts the Minecraft server',
    async execute(interaction) {
        const exarotonAPIKey = process.env.EXAROTON_API_KEY;
        const serverId = 'qnHIr22zXLD3v8MC'; // Replace with your Exaroton server ID

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
    },
};
