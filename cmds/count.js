const {client, RichEmbed} = require('discord.js');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {

    const streamOption = {seek: 0, volume: 1};
    let voiceChannelID = "508037619699941386";

    const embed = new RichEmbed()
    .setTitle('Countdown starting!')
    .setColor('#00fff2');
    console.log("Starting voice command!");
    message.channel.send(embed);

    if (voiceChannelID != null) {
        if (message.guild.channels.get(voiceChannelID)){
            let vc = message.guild.channels.get(voiceChannelID);
            console.log('Next stop, connection!');

            vc.join().then(connection => {
                console.log("[VOICE CHANNEL] joined countdown channel");
                const stream = ytdl("https://www.youtube.com/watch?v=kOrZEjLrno0", {filter: 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOption)

                dispatcher.on('end', end => {
                    console.log("[VOICE CHANNEL] left the voice channel!");
                    vc.leave();
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
    
module.exports.help = {
    name : "count"
}