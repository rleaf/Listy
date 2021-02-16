const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./auth.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
   client.user.setActivity("movies! Type -help", {
      type: "WATCHING"  
   });
   console.log('client is cooked');
})

client.on('message', async msg => {

   if (!msg.content.startsWith(prefix) || msg.author.bot) return;

   // Really not the best way to handle this, but works for now
   const args2 = msg.content.substr(1).split(' ')
   const command = args2.shift()
   const args = msg.content.split(' ').splice(1).join(' ');

   if (!client.commands.has(command)) return;

   try {
      client.commands.get(command).execute(msg, args, Discord, fs);
   } catch (error) {
      console.error(error);
      msg.reply('There was an error trying to execute that command!');
   }

   // Template so I don't forget if I need for future reference.
   // if(msg.content === `${prefix}help`) {
   // 
   // }
   // 
   // if (msg.content.startsWith(`${prefix}search`)) {
   //
   // }
});

client.login(token);