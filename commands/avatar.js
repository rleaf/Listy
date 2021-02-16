const { prefix } = require('../auth.json');

module.exports = {
   name: 'avatar',
   description: 'xyz',
   execute(msg, args, Discord, fs) {
      if (msg.content.startsWith(`${prefix}avatar`)) {
      const user = msg.mentions.users.first() || msg.author;
      const avatarEmbed = new Discord.MessageEmbed()
         .setColor(0x333333)
         .setAuthor(user.username)
         .setImage(user.displayAvatarURL());
      msg.channel.send(`was dis?`, avatarEmbed);
   }
   }
}