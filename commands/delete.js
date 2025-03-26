const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ComponentType, MessageFlags, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
   data: new SlashCommandBuilder()
      .setName('delete')
      .setDescription('Delete from the list.'),
   async execute(interaction) {
      const file = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../lists/list.json`), 'utf-8'))
      if (file.length === 0) {
         interaction.reply({ content: `There's nothing to delete dumbo.`, flags: MessageFlags.Ephemeral })
         return
      }

      const select = new StringSelectMenuBuilder()
         .setCustomId(interaction.id)
         .setPlaceholder('select')
         .setMaxValues(file.length)
         .addOptions(file.map((o, i) => new StringSelectMenuOptionBuilder()
            .setLabel(`${o.Title} (${o.Year})`)
            .setDescription(`${o.Type}`)
            .setValue(`${o.imdbID}`)
         ));

      const row = new ActionRowBuilder()
         .addComponents(select);

      const reply = await interaction.reply({
         content: 'Select films to delete.',
         components: [row],
         flags: MessageFlags.Ephemeral
      });

      const collector = reply.createMessageComponentCollector({
         componentType: ComponentType.StringSelect,
         filter: i => i.user.id === interaction.user.id && i.customId === interaction.id,
         time: 60_000
      });

      collector.on('collect', async i => {
         const updatedList = file.filter(o => !i.values.includes(o.imdbID))
         fs.writeFileSync(path.resolve(__dirname, `../lists/list.json`), JSON.stringify(updatedList), 'utf-8')

         const embed = new EmbedBuilder()
            .setTitle(`Deleted ${i.values.length} film(s)!`)
            .addFields(...file.filter(o => i.values.includes(o.imdbID)).map(o => ({ name: `${o.Title} (${o.Year})`, value: `[IMDB](https://www.imdb.com/title/${o.imdbID}) (${o.Type})` })))

         if (i.channel) {
            interaction.deleteReply()
            await i.channel.send({ embeds: [embed] })
         } else {
            await i.reply({ embeds: [embed] })
         }
      })

   },
};