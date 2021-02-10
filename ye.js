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
      msg.channel.send(`${prefix}list, ${prefix}add, ${prefix}remove, ${prefix}finished`);
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
      const listembed = new Discord.MessageEmbed()
         .setTitle("Moovie List!")
         .setColor(0x51ED26)
         .setURL('https://www.youtube.com/watch?v=j0lN0w5HVT8')
         .setFooter('Listy', 'https://cdn.discordapp.com/avatars/709934332529213540/4de87717e63539f57f302c8eeef8e458.png')
         .setDescription(fs.readFileSync('watch.txt', 'utf-8'));

      msg.channel.send(listembed);
   }


   if (msg.content.startsWith(`${prefix}add`)) {
      if (msg.member.roles.cache.find(r => r.name === "New Bois")) {
         msg.channel.send(`no >:(`)
      } else {
         fs.appendFile('watch.txt', args + "\n", 'utf-8', (err) => {
            if (err) throw err;
            console.log('appended successfully.');
         });
         msg.channel.send(reply[Math.floor(Math.random() * (reply.length))]);
      }
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

      msg.channel.send(reply[Math.floor(Math.random() * (reply.length))]);
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
});

client.login(token);