const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

 
if (!queue || !queue.playing) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`${message.author}, 您應該先禁用現有音樂的循環模式 **(${client.config.px}loop)** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**\n整個queue將不停地重複 🔁` : `${message.author}, Something went wrong. ❌`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`${message.author}, 在循環模式下,您必須先禁用現有queue **(${client.config.px}loop queue)** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**\n當前的音樂將不停地重複 \n(所有音樂loop **&loop queue**) 🔂` : `${message.author}, Something went wrong ❌`);
};
    },
};