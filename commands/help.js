// import { prefix } from "../auth.json";
const { prefix } = require('../auth.json');

module.exports = {
   name: 'help',
   description: 'HELP?',
   execute(msg, args, Discord, fs) {
      try {
         if (args) {
            switch (args) {
               case 'list':
                  msg.channel.send(`*-list* gives a list of the movies moron.`);
                  break;
               case 'search':
                  msg.channel.send(`*-search* will link a Google search with 'movie' appended.`);
                  break;
               case 'add':
                  msg.channel.send(`*-add* adds a movie to the list`);
                  break;
               case 'remove':
                  msg.channel.send(`*-remove* moves a movie from the list to 'finished'`);
                  break;
               case 'finished':
                  msg.channel.send(`*-finished* gives a list of the finished movies.`);
                  break;
               case 'delete':
                  msg.channel.send(`*-delete* deletes a movie from the list.`);
                  break;
               default:
                  break;
            }
         } else {
            msg.channel.send(`Type  *-help [command]*  for a description (no dash). \n ${prefix}list, ${prefix}search, ${prefix}add, ${prefix}remove, ${prefix}finished, ${prefix}delete`);
         }
         } catch (err) {
            msg.channel.send(`I've run into an error: ` +  err);
      }
   }
}