module.exports = {
   name: 'finished',
   description: 'list of finished movies',
   execute(msg, args, Discord, fs) {
      try {
         const finembed = new Discord.MessageEmbed()
            .setTitle("Finished Mowovies")
            .setColor(0xD25E5E)
            .setURL('https://youtu.be/qTsaS1Tm-Ic?t=10')
            .setFooter('Listy', 'https://cdn.discordapp.com/avatars/709934332529213540/4de87717e63539f57f302c8eeef8e458.png')
            .setDescription(fs.readFileSync('txt/finished.txt', 'utf-8'));
   
         msg.channel.send(finembed);
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }
   }
}