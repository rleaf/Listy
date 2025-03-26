const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv')
const fs = require('node:fs');
const path = require('node:path');

dotenv.config();
const commands = [];
const commandsPath = path.join(__dirname, 'commands')
const commandsFiles = fs.readdirSync(commandsPath)

for (const command of commandsFiles) {
   const cPath = path.join(commandsPath, command)
   const c = require(cPath)
   
   if ('data' in c && 'execute' in c) {
      commands.push(c.data.toJSON());
   } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
   }
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {

   // rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
   //    .then(() => console.log('Successfully deleted all application commands.'))
   //    .catch(console.error);

   try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      const data = await rest.put(
         Routes.applicationCommands(process.env.CLIENT_ID),
         { body: commands },
      );

      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
   } catch (error) {
      console.error(error);
   }
})();