module.exports = {
    name: 'clear',
    aliases: ['c'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, 當前沒有音樂播放❌`);

        if (!queue.tracks[0]) return message.channel.send(`${message.author},在當前音樂之後，隊列中已經沒有音樂了  ❌`);

        await queue.clear();

        message.channel.send(`queue剛剛被清空 . 🗑️`);
    },
};