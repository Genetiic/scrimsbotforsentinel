const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {

    const embed = new Discord.RichEmbed()
    .setAuthor("Command Menu", "https://cdn.discordapp.com/attachments/508037777800036382/551874858976542750/df2ba912ed4579eaee37c2f0c0655723.png")
    .addField("Fun", "`/surprise`\n`/chickens`\n`/jackie`")
    .addField("Moderator Menu", "`/start <SOLO, DUOS, SQUADS>`\n`/auto-start`\n`/count`")
    .addField("General", "`/60s`\n`/30s`\n`/now`")
    .addField("Owner:", "<@248948691782729728>")
    .setColor("#00fff2");
    message.channel.send(embed);
}


module.exports.help = {
    name : "help"
}