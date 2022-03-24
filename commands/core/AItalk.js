module.exports = {
    name: 'kgai',
    aliases: ['KA'],
    utilisation: '{prefix}kgai',

    execute(client, message,args) {
      if (!args[0]) return message.channel.send(`${message.author}, 你好呀 `);
      
        if(message.content.includes('test')){
          message.channel.send('work')
        }else {
          message.channel.send('im pig QQ 我需要kg更新我的數據庫 ||IQ = 0||')
          const newcontent = message.content.replace('&kgai',`${message.author} ${message.channel}`)
          const channel = client.channels.cache.get('955838604083621889');
          channel.send(newcontent);
   };
          
    }
}