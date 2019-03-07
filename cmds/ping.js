const {client, RichEmbed} = require("discord.js");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    message.delete()

    const m = await message.channel.send("Ping?");
    const embed = new RichEmbed()
    .setDescription(`[\`Latency\`] - ${m.createdTimestamp - message.createdTimestamp}ms! \n*Heartbeat* - ${Math.round(bot.ping)}ms`)
    .setColor('#00fff2');
    m.edit(embed);
}

module.exports.help = {
    name: "ping"
}