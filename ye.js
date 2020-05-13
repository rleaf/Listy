const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const { prefix } = require('./auth.json');

const token = 'NzA5OTM0MzMyNTI5MjEzNTQw.XrtJ1A.T7as-nV41OodoWM0npRfJ1SmOwM';


client.on('ready', () => {
   console.log('client is cooked');  
})

client.on('message', msg => {

   if(msg.content === "poggers"){
      msg.channel.send("poggies!");
   }

   if (!msg.content.startsWith(prefix) || msg.author.bot) return;

   // const args = msg.content.slice(prefix.length).split(' ');
   // const command = args.shift().toLowerCase();
   const args = msg.content.split(' ').splice(1).join(' ');


   if (msg.content === "avatar") {
      msg.reply(msg.author.displayAvatarURL());
   };

   if (msg.content === `${prefix}list`) {
      const listembed = new Discord.MessageEmbed()
         .setTitle("Movie List")
         .setColor(0x51ED26)
         .setDescription(fs.readFileSync('watch.txt', 'utf-8'));

      msg.channel.send(listembed);
   }
   
   if (msg.content.startsWith(`${prefix}add`)) {
         console.log(args);
         fs.appendFileSync('watch.txt', args + "\n")
         msg.channel.send(`Added "${args}".`);

   }

   if (msg.content.startsWith(`${prefix}remove`)) {
      fs.readFile('watch.txt', 'utf-8', function(err, data) {
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
         .setTitle("Finished Movies")
         .setColor(0xD25E5E)
         .setDescription(fs.readFileSync('finished.txt', 'utf-8'));

      msg.channel.send(finembed);
   }
})

client.login(token);