/** SECURE ENV **/
require("dotenv").config();


const discord = require("discord.js");
const client = new discord.Client({
    partials: ["MESSAGE", "REACTION"]
});
const PREFIX = "!";

const webhookClient = new discord.WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
)

/** BOT ACTION **/
client.on('ready', () => {
    console.log(`[+] ${client.user.tag} est connecté avec succès !`);
    client.user.setActivity("Online");
    client.user.setStatus("online");
    client.user.setActivity("En cours de développement");
});

/** REACTION ROLES **/
client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === process.env.CGU) {
        switch (name) {
            case '✅':
                member.roles.add(process.env.MEMBER)
                break;
            case '❌':
                member.roles.add(process.env.SOLDIER)
                break;
        }
    }
});
client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === process.env.CGU) {
        switch (name) {
            case '✅':
                member.roles.remove(process.env.MEMBER)
                break;
            case '❌':
                member.roles.remove(process.env.SOLDIER)
                break;
        }
    }
});

client.on('guildMemberAdd', member => {
    console.log('Un nouveau membre');
    member.guild.channels.cache.find(channel => channel.id === process.env.WELCOME_CHAN)
    send(member.displayName + 'nous a rejoins')
});

client.on('guildMemberRemove', member => {
    console.log('Un membre nous quitté');
    member.guild.channels.cache.find(channel => channel.id === process.env.WELCOME_CHAN).send(member.displayName + 'est partie')
});

client.on('message', msg => {
    const embed = new discord.MessageEmbed()
        .setTitle('OYE OYE')
        .setColor('GREEN')
        .setDescription('Ton avis nous intéresse!')
        .setThumbnail('')

    if (msg.author.bot);
    let CMD_NAME = [];
    if (msg.content.startsWith(PREFIX)) {
        CMD_NAME = msg.content
            .trim()
            .substring(PREFIX.length).toUpperCase()
            .split(" ");
        console.log(CMD_NAME);
    }
    if (CMD_NAME[0] === 'ANNOUNCE') {
        webhookClient.send(embed);
    }
    if (CMD_NAME[0] === 'PING') {
        webhookClient.send(embed);
    }
    if (CMD_NAME[0] === 'CTF') {
        webhookClient.send(embed);
    }

});

/** TOKEN SECTION  **/
client.login(process.env.TOKEN);
