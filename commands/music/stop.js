module.exports = {
    name: 'stop',
    aliases: ['st'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author},當前沒有音樂播放！  ❌`);

        queue.destroy();

        message.channel.send(`此服務器上播放的音樂已關閉，下次見.✅`);
    },
};