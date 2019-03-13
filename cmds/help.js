const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {

    const embed = new Discord.RichEmbed()
    .setAuthor("Command Menu", "https://cdn.discordapp.com/attachments/550829459608174602/555220939361615882/df2ba912ed4579eaee37c2f0c0655723.png")
    .addField("• General", "`/60s`, `/30s`, `/now`")
    .addField("• Fun", "`/surprise`, `/chickens`, `/jackie`")
    .addField("• Info", "`/ping`, `/userinfo`, `/serverinfo`")
    .setThumbnail('https://cdn.discordapp.com/attachments/550829459608174602/555220939361615882/df2ba912ed4579eaee37c2f0c0655723.png')
    .setColor("#00fff2");
    message.channel.send(embed);

    const mod = new Discord.RichEmbed()
    .setTitle('Moderator Menu')
    .addField("• Scrims ","`/start <SOLO, DUOS, SQUADS>`, `/auto-start`, `/count`")
    .addField('• Owner', "<@248948691782729728>")
    .setColor('#00fff2')
    message.channel.send({embed: mod});
}


module.exports.help = {
    name : "help"
}