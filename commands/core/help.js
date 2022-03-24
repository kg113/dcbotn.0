const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h',"yardım"],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('WHITE');
        embed.setTitle(client.user.username);
        embed.setThumbnail(client.user.displayAvatarURL())
        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('加我的ig啦 --> [click here](https://www.instagram.com/_kg113_/)\n pm me if any bug<3 `kg113##9487`') ;
        embed.addField(`Command list`, '`&play` | `&stop` | `&loop` | `&nowplaying` | `&clear` | `&queue`');

        embed.setTimestamp();
        embed.setFooter('Kgbot', message.author.avatarURL({ dynamic: true }));
        message.channel.send({ embeds: [embed] });
    },
};
