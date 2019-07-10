const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {

    const embed = new Discord.RichEmbed()
    .setTitle("How to use ScrimsBot commands -")
    .setColor('#00cc00')
    .setDescription("n!start <SOLO>,<DUOS>,<SQUADS> \n n!auto-start \n n!count")
    message.channel.send(embed);
    
    const rules = new Discord.RichEmbed()
    .setTitle("Rules")
    .setDescription("1st. Do not abuse any commands, If you are found abusing/trolling/annoying you will lose your ScrimsHost position. \n 2nd. Use these commands to host not to do it anywhere else only to host. \n 3rd. This bot is used to host **Regular scrims** not endgame nor custom.")
    .setColor('#00cc00')
    message.channel.send({embed: rules});

    const guide = new Discord.RichEmbed()
    .setTitle('Guidelines to other usefull commands')
    .setDescription('**1)** These commands are used by Mod+, In another meaning ScrimHosts cannot use it at all. \n **2)** ')

}


module.exports.help = {
    name : "rules"
}