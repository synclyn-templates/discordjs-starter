import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import { REST, Routes } from 'discord.js';

import dotenv from 'dotenv';
dotenv.config();

client.on('ready', () => {
    console.log(`[SYNCLYN] Logged in as ${client.user.tag}!`);
});



const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
    console.log('[SYNCLYN] Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('[SYNCLYN] Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(process.env.TOKEN);