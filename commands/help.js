import { prefix } from "../auth.json";

module.exports = {
   name: 'help',
   description: 'HELP?',
   execute(msg, args) {
      if(msg.content === `${prefix}help`) {
         try {
            msg.channel.send(`${prefix}list, ${prefix}search, ${prefix}add, ${prefix}remove, ${prefix}finished`);
         } catch (err) {
            msg.channel.send(`I've run into an error: ` +  err);
      }
   // }
   }
}