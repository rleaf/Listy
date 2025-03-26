const { Client, Collection, Events, GatewayIntentBits, MessageFlags, ActivityType } = require('discord.js')
const path = require('node:path')
const fs = require('node:fs')
const dotenv = require('dotenv')

class Listy {
   constructor() {
      dotenv.config()
      this.client = new Client({ intents: [GatewayIntentBits.Guilds] })
      this.client.commands = new Collection()

      this.client.once(Events.ClientReady, readyClient => {
         this.client.user.setActivity('movies!', { type: ActivityType.Watching })
         console.log(`Ready! Logged in as ${readyClient.user.tag}`)
      })

      this.initCommands()
      this.interactionHandler()
      this.start()
   }

   initCommands() {
      const commandsPath = path.join(__dirname, 'commands')
      const commands = fs.readdirSync(commandsPath)

      for (const command of commands) {
         const cPath = path.join(commandsPath, command)
         const c = require(cPath)
         if ('data' in c && 'execute' in c) {
            this.client.commands.set(c.data.name, c)
         } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
         }
      }
   }

   interactionHandler() {
      this.client.on(Events.InteractionCreate, async interaction => {
         if (!interaction.isChatInputCommand()) return
         const command = interaction.client.commands.get(interaction.commandName)

         if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`)
            return
         }

         try {
            await command.execute(interaction)
         } catch (error) {
            console.error(error)
            if (interaction.replied || interaction.deferred) {
               await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral })
            } else {
               await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral })
            }
         }
      })
   }

   start() {
      this.client.login(process.env.TOKEN)
   }
}

const listy = new Listy()