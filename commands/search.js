module.exports = {
   name: 'search',
   description: 'Provide google search with movie keyword added',
   execute(msg, args, Discord) {
      try {

         if (args === '') {
            msg.channel.send(`No arguments given, sadge.`)
            return;
         }

         gSearchArgs = args.split(' ').join('+');
         const gSearch = new Discord.MessageEmbed()
            .setTitle(`Here's a google search of the movie ${args}`)
            .setURL(`https://www.google.com/search?q=${gSearchArgs}+movie`);

         msg.channel.send(gSearch);
      } catch (err) {
         msg.channel.send(`I've run into an error: ` + err);
      }
   }
      
}