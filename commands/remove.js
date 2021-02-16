const reply = ["!", ":]", ":)", "C:", ":O"];

module.exports = {
   name: 'remove',
   description: 'remove movie from list and add it to finished',
   execute(msg, args, Discord, fs) {
      try {

      if (args === '') {
         msg.channel.send(`No arguments given, sadge.`)
         return;
      }

      fs.readFile('txt/watch.txt', 'utf-8', function (err, data) {
         if (err) throw error;

         // Check to see if the argument being passed is in the text file
         if (data.includes(args)) {
            console.log('That file is in watch.txt');

            // Replace the argument with empty string
            let newMovie = data.replace(args, '');
            // Removes any blank lines. https://stackoverflow.com/questions/16369642/javascript-how-to-use-a-regular-expression-to-remove-blank-lines-from-a-string
            let removeWhite = newMovie.replace(/^\s*[\r\n]/gm, '');

            fs.writeFile('txt/watch.txt', removeWhite, (err) => {
               if (err) throw err;
               console.log("updated file");
            });

            fs.appendFileSync('txt/finished.txt', args + "\n");
      
            msg.channel.send(`Moved **${args}** to finished! ` + reply[Math.floor(Math.random() * (reply.length))]);
         } else {
            msg.channel.send(`That movie isn't in the list baka dumbass - make sure you spelt it right and/or check capitalization.`)
         }
   
      });
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }
   }
}