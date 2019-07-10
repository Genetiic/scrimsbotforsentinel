const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

    let voice = "508037619699941386";
    let codes = "508037742572339223";
    let general = "508037777800036382";

    console.log("Activating auto start command!");

    let intro = new Discord.RichEmbed()
    .setTitle("Scrim will start every xx:00 and xx:30")
    .setColor('#00cc00');

    bot.guilds.get(message.guild.id).channels.get(general).send({embed : intro}).catch((err) => {
        console.log(err);
    });

    let autoScrims = setInterval(() => {
        let time = new Date();
        let min = time.getMinutes();
        let embed = new Discord.RichEmbed()
        .setColor("#00cc00");

        if (min === 55 || min == 25) {
            embed.setTitle("Next match starts in 5 minutes!");

            bot.guilds.get(message.guild.id).channels.get(general).send({embed : embed}).catch((err) => {
                console.log(err);
            });
        }else if (min === 57 || min == 27) {
            embed.setTitle("Next match starts in 3 minutes!");

            bot.guilds.get(message.guild.id).channels.get(general).send({embed : embed}).catch((err) => {
                console.log(err);
            });
        }else if (min === 59 || min == 29) {
            embed.setTitle("Next match starts in 1 minutes!");

            bot.guilds.get(message.guild.id).channels.get(general).send({embed : embed}).catch((err) => {
                console.log(err);
            });
        }else if (min === 00 || min == 00) {
            embed.setTitle("NEXT MATCH STARTS NOW!");

            bot.guilds.get(message.guild.id).channels.get(general).send({embed : embed}).catch((err) => {
                console.log(err);
            });

            bot.guilds.get(message.guild.id).channels.get(codes).send("n!count").catch((err) => {
                console.log(err);
            });

            bot.guilds.get(message.guild.id).channels.get(codes).send("n!start").catch((err) => {
                console.log(err);
            });
        }

    }, 60000)

}



module.exports.help = {
    name : "auto-start"
}