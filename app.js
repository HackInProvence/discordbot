const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv-flow').config();

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
};

client.on('ready', () => {
    console.log(`[+] ${client.user.tag} est connecté avec succès !`);
    client.user.setActivity("Online");
    client.user.setActivity("En cours de développement")
});

client.on('message', msg => {
    if (msg.content.toLowerCase() === 'ping') {
        msg.reply('Arrêtez de Pong!');
    }
});

client.login(config.token);