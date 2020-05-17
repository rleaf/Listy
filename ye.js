const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const { prefix } = require('./auth.json');

const token = 'NzA5OTM0MzMyNTI5MjEzNTQw.XrxxsA.dnAezYUX0faIq9Iq38Oz8UUrCtU';


const reply = ["okey dokey boomer!", "oke", "!", "pepehands, shit movie", "yuppers", ":]", "big hunka monka", "omg pog movie"]
const randomreply = [reply[Math.floor(Math.random() * (reply.length + 1))]];



client.on('ready', () => {
   client.user.setPresence({
      game: {
         name: "poggers",
         type: "Playing"
      }
   });
   console.log('client is cooked');
})

client.on('message', async msg => {

   if (msg.content === "poggers") {
      msg.channel.send("poggies!");
   }

   if (!msg.content.startsWith(prefix) || msg.author.bot) return;
   const args = msg.content.split(' ').splice(1).join(' ');
   // const args = msg.content.slice(prefix.length).split(' ');
   // const command = args.shift().toLowerCase();


   if (msg.content === `${prefix}avatar`) {
      msg.reply(msg.author.displayAvatarURL());
   };

   if (msg.content === `${prefix}list`) {
      const listembed = new Discord.MessageEmbed()
         .setTitle("Mowovie List!")
         .setColor(0x51ED26)
         .setURL('https://www.youtube.com/watch?v=j0lN0w5HVT8')
         .setFooter('Listy', 'https://cdn.discordapp.com/avatars/709934332529213540/4de87717e63539f57f302c8eeef8e458.png')
         .setDescription(fs.readFileSync('watch.txt', 'utf-8'));

      msg.channel.send(`her u go budy`, listembed);
      // msg.author.send(listembed);
   }

   if (msg.content.startsWith(`${prefix}add`)) {
      msg.channel.send(randomreply);
      fs.appendFileSync('watch.txt', args + "\n")
   }

   if (msg.content.startsWith(`${prefix}remove`)) {
      fs.readFile('watch.txt', 'utf-8', function (err, data) {
         if (err) throw error;

         let newMovie = data.replace(args + '\n', '');
         let removeWhite = newMovie.replace(/^\s*[\r\n]/gm, '');
         // let removeWhite = newMovie.replace(/^.*args*$/mg, '');

         fs.writeFile('watch.txt', removeWhite, (err) => {
            if (err) throw err;
            console.log("updated file");

         });
      });

      fs.appendFileSync('finished.txt', args + "\n");

   }

   if (msg.content.startsWith(`${prefix}finished`)) {
      const finembed = new Discord.MessageEmbed()
         .setTitle("Finished Mowovies")
         .setColor(0xD25E5E)
         .setURL('https://youtu.be/qTsaS1Tm-Ic?t=10')
         .setFooter('Listy', 'https://cdn.discordapp.com/avatars/709934332529213540/4de87717e63539f57f302c8eeef8e458.png')
         .setDescription(fs.readFileSync('finished.txt', 'utf-8'));

      msg.channel.send(finembed);
      // msg.author.send(finembed);
   }
})

client.login(token);