const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ComponentType, MessageFlags, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
   data: new SlashCommandBuilder()
      .setName('fin')
      .setDescription('Move from the list to the finished list.'),
   async execute(interaction) {
      const list = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../lists/list.json`), 'utf-8'))

      const select = new StringSelectMenuBuilder()
         .setCustomId(interaction.id)
         .setPlaceholder('select')
         .addOptions(list.map((o, i) => new StringSelectMenuOptionBuilder()
            .setLabel(`${o.Title} (${o.Year})`)
            .setDescription(`${o.Type}`)
            .setValue(`${i}`)
         ));

      const row = new ActionRowBuilder()
         .addComponents(select);

      const reply = await interaction.reply({
         content: 'Select watched motion picture.',
         components: [row],
         flags: MessageFlags.Ephemeral
      });

      const collector = reply.createMessageComponentCollector({
         componentType: ComponentType.StringSelect,
         filter: i => i.user.id === interaction.user.id && i.customId === interaction.id,
         time: 60_000
      });

      collector.on('collect', async i => {
         const donut = list.toSpliced(i.values[0], 1)
         fs.writeFileSync(path.resolve(__dirname, `../lists/list.json`), JSON.stringify(donut), 'utf-8')
         
         const fin = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../lists/watched.json`), 'utf-8'))
         fin.push(list[i.values[0]])
         fs.writeFileSync(path.resolve(__dirname, `../lists/watched.json`), JSON.stringify(fin), 'utf-8')

         if (i.channel) {
            interaction.deleteReply()
            await i.channel.send(`Mowoved ${list[i.values[0]].Title} (${list[i.values[0]].Year}) to finished list!`)
         } else {
            await i.reply(`Mowoved ${list[i.values[0]].Title} (${list[i.values[0]].Year}) to finished list!`)
         }
      })

   },
};