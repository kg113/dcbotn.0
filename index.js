const { Player } = require('discord-player');
const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require('fs');
let sdmsg = true
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('Server started');
});

let client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();
const player = client.player

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};
console.log(`-> Loaded commands...`);
readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`${command.name.toLowerCase()} Load Command!`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});
player.on('error', (queue, error) => {
    console.log(`There was a problem with the song queue => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`I'm having trouble connecting => ${error.message}`);
});
player.on('trackStart', (queue, track) => {
  if(sdmsg){
      if (!client.config.opt.loopMessage && queue.repeatMode !== 0 ) return;
      queue.metadata.send(`🎵 開始播放音樂: \n> **${track.title}** \n> 頻道: **${queue.connection.channel.name}** 🎧`);
}});


player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`**${track.title}** 添加到播放列表。✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('有人把我踢出去了，整個播放列表都被清除了！❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('我離開了音頻通道，因為我的音頻通道上沒有人。❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('所有播放隊列都完成了，我想你可以再聽一些音樂。✅');
});



if(client.config.TOKEN){
client.login(client.config.TOKEN).catch(e => {
console.log("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!")
})
} else {
console.log("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!")
}
