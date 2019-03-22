const Discord = require('discord.js')
const fs = require('fs');


module.exports.run = async (bot, message, args) => {

    if (args.length === 0){
        const embed = new Discord.RichEmbed()
        .setDescription("A role is needed after this command ex: /add-roles @scrimhosters")
        .setColor("#ff0000");
        message.channel.send(embed);
    }else if (args.length > 0){
        let roles_raw = fs.readFileSync('./roles.json');
        let roles_array = JSON.parse(roles_raw);

        let role = args[0];
        let found = false;

        for (var i = 0; i < roles_array.roles.length; i++){
            if (role === roles_array.roles[i]){
                found = true;
                const embed = new Discord.RichEmbed()
                .setDescription(role + ' is already added!')
                .setColor("#ff0000");
                message.channel.send(embed)
                return; 
            }
        }

        if (!found){
            roles_array.roles.push(role);
            let roles_write = JSON.stringify(roles_array);
            fs.writeFileSync('./roles.json', roles_write);
            const embed = new Discord.RichEmbed()
            .setDescription(role + ' is now added!')
            .setColor('#15ff00')
            message.channel.send(embed)
            return;
        }
    }


}



module.exports.help = {
    name : "add-roles"
}