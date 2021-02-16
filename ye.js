const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const { prefix, token } = require('./auth.json');

const reply = ["!", ":]", ":)", "C:", ":O"];

client.on('ready', () => {
   client.user.setActivity("movies! Type -help", {
      type: "WATCHING"  
   });
   console.log('client is cooked');
})

client.on('message', async msg => {

   if (msg.content === "poggers") {
      msg.channel.send("poggies!");
   }

   if (!msg.content.startsWith(prefix) || msg.author.bot) return;

   const args = msg.content.split(' ').splice(1).join(' ');

   if(msg.content === `${prefix}help`) {
      try {
         msg.channel.send(`${prefix}list, ${prefix}add, ${prefix}remove, ${prefix}finished`);
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }
   }


   if (msg.content.startsWith(`${prefix}avatar`)) {
      const user = msg.mentions.users.first() || msg.author;
      const avatarEmbed = new Discord.MessageEmbed()
         .setColor(0x333333)
         .setAuthor(user.username)
         .setImage(user.displayAvatarURL());
      msg.channel.send(`was dis?`, avatarEmbed);
   }


   if (msg.content === `${prefix}list`) {
      try {
         const listembed = new Discord.MessageEmbed()
            .setTitle("Moovie List!")
            .setColor(0x51ED26)
            .setURL('https://www.youtube.com/watch?v=j0lN0w5HVT8')
            .setFooter('Listy', 'https://cdn.discordapp.com/avatars/709934332529213540/4de87717e63539f57f302c8eeef8e458.png')
            .setDescription(fs.readFileSync('watch.txt', 'utf-8'));
   
         msg.channel.send(listembed);
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }
   }


   if (msg.content.startsWith(`${prefix}add`)) {
      try {
         // Forbid anybody with the role 'New Bois' from adding movies to the list
         if (msg.member.roles.cache.find(r => r.name === "New Bois")) {
            msg.channel.send(`no >:(`)
         } else {
            fs.appendFile('watch.txt', args + "\n", 'utf-8', (err) => {
               if (err) throw err;
               console.log('appended successfully.');
            });
            msg.channel.send(reply[Math.floor(Math.random() * (reply.length))]);
         }
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }
   }


   if (msg.content.startsWith(`${prefix}remove`)) {
      try {
         fs.readFile('watch.txt', 'utf-8', function (err, data) {
            if (err) throw error;
   
            // Check to see if the argument being passed is in the text file
            if (data.includes(args)) {
               console.log('That file is in watch.txt');
   
               // Replace the argument with empty string
               let newMovie = data.replace(args, '');
               // Removes any blank lines. https://stackoverflow.com/questions/16369642/javascript-how-to-use-a-regular-expression-to-remove-blank-lines-from-a-string
               let removeWhite = newMovie.replace(/^\s*[\r\n]/gm, '');
   
               fs.writeFile('watch.txt', removeWhite, (err) => {
                  if (err) throw err;
                  console.log("updated file");
               });
   
               fs.appendFileSync('finished.txt', args + "\n");
         
               msg.channel.send(`Moved **${args}** to finished! ` + reply[Math.floor(Math.random() * (reply.length))]);
            } else {
               msg.channel.send(`That movie isn't in the list baka dumbass - make sure you spelt it right and/or check capitalization.`)
            }
   
         });
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }

   }


   if (msg.content.startsWith(`${prefix}finished`)) {
      try {
         const finembed = new Discord.MessageEmbed()
            .setTitle("Finished Mowovies")
            .setColor(0xD25E5E)
            .setURL('https://youtu.be/qTsaS1Tm-Ic?t=10')
            .setFooter('Listy', 'https://cdn.discordapp.com/avatars/709934332529213540/4de87717e63539f57f302c8eeef8e458.png')
            .setDescription(fs.readFileSync('finished.txt', 'utf-8'));
   
         msg.channel.send(finembed);
         // msg.author.send(finembed);
      } catch (err) {
         msg.channel.send(`I've run into an error: ` +  err);
      }
   }
});

client.login(token);