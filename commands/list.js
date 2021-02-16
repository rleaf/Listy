module.exports = {
   name: 'list',
   description: 'displays list',
   execute(msg, args, Discord, fs) {
      try {
         // args = args;
         const listembed = new Discord.MessageEmbed()
            .setTitle("Moovie List!")
            .setColor(0x51ED26)
            .setURL('https://www.youtube.com/watch?v=TiC8pig6PGE')
            .setFooter('Listy', 'https://cdn.discordapp.com/avatars/709934332529213540/4de87717e63539f57f302c8eeef8e458.png')
            .setDescription(fs.readFileSync('txt/watch.txt', 'utf-8'));
   
         msg.channel.send(listembed);
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }
   }
}