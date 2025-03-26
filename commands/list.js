const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path')
const fs = require('fs');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('list')
      .setDescription('Get list.')
      .addStringOption(option =>
         option.setName('category')
            .setDescription('Do you want to see the current list or the watched list?')
            .setRequired(true)
            .addChoices(
               { name: 'List.', value: '1' },
               { name: 'Watched.', value: '0' }
            )
      ),
   async execute(interaction) {
      const url = (parseInt(interaction.options.getString('category'))) ? 'list' : 'watched'
      const title = (parseInt(interaction.options.getString('category'))) ? 'ヽ(＠⌒▽⌒＠)ﾉ The List ヽ(＠⌒▽⌒＠)ﾉ' : '(◡︿◡✿)'
      const list = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../lists/${url}.json`), 'utf-8'))

      const embed = new EmbedBuilder()
         .setTitle(title)
         .addFields(
            ...list.map(o => ({ name: `${o.Title} (${o.Year})`, value: `[IMDB](https://www.imdb.com/title/${o.imdbID}) (${o.Type})` }))
         )
         
      await interaction.reply({ embeds: [embed] });
   },
};