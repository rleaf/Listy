const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ComponentType, MessageFlags, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')
const dotenv = require('dotenv');
const getOMDB = require('../utility/getOmdb');
dotenv.config();

module.exports = {
   data: new SlashCommandBuilder()
      .setName('add')
      .setDescription('Find & add motion pictures by title to the list.')
      .addStringOption(option => 
         option.setName('title')
            .setDescription('Movie title')
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
            content: 'No movies found.',
            flags: MessageFlags.Ephemeral,
         });
         return
      }

      const select = new StringSelectMenuBuilder()
         .setCustomId(interaction.id)
         .setPlaceholder('select')
         .addOptions(databaseResponse.map((o, i) => new StringSelectMenuOptionBuilder()
            .setLabel(`${o.Title} (${o.Year})`)
            .setDescription(`${o.Type}`)
            .setValue(`${i}`)
         ));
     
      const row = new ActionRowBuilder()
         .addComponents(select);

      const reply = await interaction.reply({
         content: 'Select motion picture.',
         components: [row],
         flags: MessageFlags.Ephemeral
      });

      const collector = reply.createMessageComponentCollector({
         componentType: ComponentType.StringSelect,
         filter: i => i.user.id === interaction.user.id && i.customId === interaction.id,
         time: 60_000
      });

      const roulette = [
         '（ ´_⊃｀）',
         '≧◡≦',
         '(✿◠‿◠)',
         '(●´ω｀●)',
      ]

      collector.on('collect', async i => {
         const donut = databaseResponse[i.values[0]]
         const file = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../lists/list.json`), 'utf-8')) || []
         if (file.some(o => o.imdbID === donut.imdbID)) {
            await i.reply({
               content: 'This film is already in the list dumbo.',
               flags: MessageFlags.Ephemeral,
            });
            return
         }
         file.push(donut)
         fs.writeFileSync(path.resolve(__dirname, `../lists/list.json`), JSON.stringify(file), 'utf-8')
         // console.log(JSON.stringify(donut), 'val')

         const embed = new EmbedBuilder()
            .setTitle(`${donut.Title} (${donut.Year})`)
            .setColor(0x000000)
            .setURL(`https://www.imdb.com/title/${donut.imdbID}`)
            .setDescription(`Added to list!`)
            .setThumbnail(donut.Poster)
            .addFields({ name: '', value: roulette[Math.floor(Math.random() * roulette.length)] })

         if (i.channel) {
            interaction.deleteReply()
            await i.channel.send({embeds: [embed]})
         } else {
            await i.reply({embeds: [embed]})
         }
      })

   },
};