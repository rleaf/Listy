const reply = ["!", ":]", ":)", "C:", ":O"];

module.exports = {
   name: 'add',
   description: 'add a movie to the list',
   execute(msg, args, Discord, fs) {
      try {

         if (args === '') {
            msg.channel.send(`No arguments given, sadge.`)
            return;
         }
         
         // Forbid anybody with the role 'New Bois' from adding movies to the list
         if (msg.member.roles.cache.find(r => r.name === "New Bois")) {
            msg.channel.send(`no >:(`);
         } else {
            fs.appendFile('txt/watch.txt', args + "\n", 'utf-8', (err) => {
               if (err) throw err;
               console.log('appended successfully.');
            });
            msg.channel.send(`Added **${args}** to the list! ` + reply[Math.floor(Math.random() * (reply.length))]);
         }
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }
   }
}