const Discord = require('discord.js');
const Listing = require('./../modules/Listing');
const fs = require('fs');
const settings = require('./../settings.json');
const owner = settings.owner;

module.exports.run = async (bot, message, args) => {
    let voiceChannelID = "573674278117965825"
    let voice_channel = message.guild.channels.get(voiceChannelID);
    let members = message.guild.channels.get(voiceChannelID).members.size;
    let snipeChannel = message.channel;
    const filter = m => !m.author.bot;
    let game = new Listing();

    let raw = fs.readFileSync('./roles.json');
    let allowedRoles = JSON.parse(raw);

    let validation = function(serverRoles, userRoles){
        let val = false;
        serverRoles.forEach((role) => {
            userRoles.forEach((usr) => {
                if (role == usr ){
                    val = true;
                }
            });
        });
        return val;
    }

    let editLast3 = null;
 
    let gamemode = "SOLO";
 
    if (args.length > 0){
        if (args[0].toUpperCase() === "SOLO" ||
            args[0].toUpperCase() === "DUOS" ||
            args[0].toUpperCase() === "SQUADS"){
                gamemode = args[0];
            }
    }
   
    let startMessage = new Discord.RichEmbed()
        .setColor("#ff2658")
        .setTitle("Scrim Match Starting!")
        .setDescription("Type your Bus Paths here by putting the start of the bus path and the end / last stop location. Ex: junk lazy")
        .addField("Hosted By", `${message.author}`, true)
        .addField("Gamemode", gamemode, true)
        .addField("Game ", "FORTNITE", true)
        .setFooter(`${message.guild.name} / dev: Genetiicツ#6263 `, "https://images-ext-1.discordapp.net/external/7Gb8keZPvsVq6ShcXaunMBSClTYZCJvnGRDwkK5Utzc/https/cdn.discordapp.com/attachments/519147048126119937/529834061720715290/LUIGI5ewn_logo.png")
    
    message.channel.send({embed: startMessage});    
 
    let time = 25;
    let editTime = "";
 
    let timeEmbed = new Discord.RichEmbed()
        .setTitle("Next match in aprox...")
        .setDescription(time + " minutes")
        .setColor("#ff2658");
       
 
    setTimeout(async () => {
        editTime = await message.channel.send({embed: timeEmbed}).catch( (err) => {
            console.log("Cant edit deleted message.")
        });
    }, 10);
 
    let timeInterval = setInterval(() => {
        if (time === 1){
            time -= 1;
            timeEmbed.setDescription(time + " minutes");
            clearInterval(timeInterval);
        } else {
            time -= 1;
            timeEmbed.setDescription(time + " minutes")
        }
 
        editTime.edit({embed: timeEmbed}).catch((err) => {
            console.log("cant edit")
            clearInterval(timeInterval);
        });
 
    },60000);
       
    let last3 = new Discord.RichEmbed()
        .setTitle("Bus Paths")
        .setColor("#ff2658");
 
    setTimeout(async () => {
        editLast3 = await message.channel.send({embed: last3});
        message.channel.overwritePermissions(message.guild.defaultRole, {
            SEND_MESSAGES: true
 
        }).catch((err) => {
            console.log(err);
        })
 
    }, 10);
 
    const collector = snipeChannel.createMessageCollector(filter, {time: 180000});
 
    collector.on('collect', m => {
        console.log(`Collected ${m.content} | ${m.author.username}`);
 
       
        if (validation(allowedRoles.roles,m.member.roles.array()) || m.member.id === owner){
            if (m.content === "/start" || m.content === "/stop"){
                collector.stop();
                console.log("Collector stopped");
                return;
 
               
            }
        }
        if (game.data.length === 0 && m.length){
            game.addID(m.content.toUpperCase(), m.author.username);
        }else if (m.content.length){
            if (game.userPresent(m.author.username)){
                game.deleteUserEntry(m.author.username);
                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author.username);
                }else{
                    game.addID(m.content.toUpperCase(), m.author.username);
                }
            } else {
                if  (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author.username);
                }else {
                    game.addID(m.content.toUpperCase(), m.author.username);
                }
            }
        }
 
 
        game.sort();
 
        let str = " ";
        last3 = new Discord.RichEmbed()
        .setTitle ("Bus Paths")
        .setThumbnail('https://cdn.discordapp.com/attachments/519147048126119937/529834061720715290/LUIGI5ewn_logo.png')
        .setColor("#ff2658")
 
        let playerCount = 0;
        for (var i = 0; i < game.data.length; i++){
        playerCount += game.data[i].users.length;
        }        
        for (var i = 0; i < game.data.length; i++){
            str = " ";
            for (var j = 0; j < game.data[i].users.length ; j++){
                str += game.data[i].users[j] + "\n";
            }
            last3.addField(`${game.data[i].id.toUpperCase()} - ${game.data[i].users.length} PLAYERS`, str, true);
            last3.setFooter(`${game.data.length} Responses | ${playerCount} Players | ${members} Players In ${voice_channel.name}`, "https://cdn.discordapp.com/attachments/519147048126119937/529834061720715290/LUIGI5ewn_logo.png")
        }
            editLast3.edit({embed: last3}).catch((err) => {
                console.log("Caught edit error");
            });
 
        if (m.deletable){
            m.delete().catch((err) => {
                console.log("Cant delete")
                console.log(err);
            });
        }
    });
 
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
   
        let endMessage = new Discord.RichEmbed()
        .setTitle("No more Bus Paths accepted at this point")
        .setDescription("Good luck and have fun in your game!")
        .setFooter('Use code: SMB_Luigi5ewn in the item shop!')
        .setColor("#ff0000");
 
        message.channel.send({embed: endMessage});
 
        message.channel.overwritePermissions(message.guild.defaultRole, {
            SEND_MESSAGES: true
        }).catch((err) => {
            console.log(err);
        })
 
    });
 
   
   
 
   
 
   
 
}
 
 
 
module.exports.help = {
    name: "start"
}