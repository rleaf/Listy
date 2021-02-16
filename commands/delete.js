const reply = ["!", ":]", ":)", "C:", ":O"];

module.exports = {
   name: 'delete',
   description: 'delete from list, do not add to finished list',
   execute(msg, args, Discord, fs) {
      try {

         if (args === '') {
            msg.channel.send(`No arguments given, sadge`)
            return;
         }

         if (msg.member.roles.cache.find(r => r.name === 'New Bois')) {
            msg.channel.send(`No >:(`);
         } else {
            fs.readFile('txt/watch.txt', 'utf-8', function (err, data) {
               if (err) throw err;

               if (data.includes(args)) {
                  // Replace the argument with empty string
                  let newMovie = data.replace(args, '');
                  // Removes any blank lines. https://stackoverflow.com/questions/16369642/javascript-how-to-use-a-regular-expression-to-remove-blank-lines-from-a-string
                  let removeWhite = newMovie.replace(/^\s*[\r\n]/gm, '');
      
                  fs.writeFile('txt/watch.txt', removeWhite, (err) => {
                     if (err) throw err;
                     console.log("updated file");
                  });

                  msg.channel.send(`Deleted **${args}** from list! ` + reply[Math.floor(Math.random() * (reply.length))]);
               } else {
                  msg.channel.send(`That movie isn't in the list baka dumbass - make sure you spelt it right and/or check capitalization.`)
               }
            })
         }
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err); 
      }
   }
}