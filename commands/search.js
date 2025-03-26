const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ComponentType, MessageFlags, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
const getOMDB = require('../utility/getOmdb');
dotenv.config();

module.exports = {
   data: new SlashCommandBuilder()
      .setName('search')
      .setDescription('Search for motion pictures by title. Can optionally add year to refine search. Does not add to list.')
      .addStringOption(option =>
         option.setName('title')
            .setDescription('Motion picture title')
            .setRequired(true)
      )
      .addStringOption(option =>
         option.setName('year')
            .setDescription('Motion picture year')
            .setRequired(false)
      ),
   async execute(interaction) {

      const o = interaction.options.getString('title')
      const donut = interaction.options.getString('year')
      const databaseResponse = await getOMDB(o, donut)

      if (!databaseResponse) {
         await interaction.reply({
            content: 'No films found.',
            flags: MessageFlags.Ephemeral,
         });
         return
      }

      const select = new StringSelectMenuBuilder()
         .setCustomId(interaction.id)
         .setPlaceholder('Select film')
         .addOptions(databaseResponse.map((o, i) => new StringSelectMenuOptionBuilder()
            .setLabel(`${o.Title} (${o.Year})`)
            .setDescription(`${o.Type}`)
            .setValue(`${i}`)
         ));

      const row = new ActionRowBuilder()
         .addComponents(select);

      const reply = await interaction.reply({
         content: 'Found some stuff!',
         components: [row],
         flags: MessageFlags.Ephemeral
      });

      const collector = reply.createMessageComponentCollector({
         componentType: ComponentType.StringSelect,
         filter: i => i.user.id === interaction.user.id && i.customId === interaction.id,
         time: 60_000
      });

      collector.on('collect', async i => {
         const donut = databaseResponse[i.values[0]]
         console.log(donut, 'donut')
         const embed = new EmbedBuilder()
            .setTitle(`${donut.Title} (${donut.Year})`)
            .setColor(0x000000)
            .setURL(`https://www.imdb.com/title/${donut.imdbID}`)
            // .setImage(donut.Poster)

         if (donut.Poster !== 'N/A') {
            embed.setImage(donut.Poster)
         }

         if (i.channel) {
            interaction.deleteReply()
            await i.channel.send({ embeds: [embed] })
         } else {
            await i.reply({ embeds: [embed] })
         }
      })

   },
};