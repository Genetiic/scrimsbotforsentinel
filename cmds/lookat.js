
module.exports.run = async (bot, message, args) => {

    let tNumber = Math.floor((Math.random() * 1) +1);
    message.channel.send("*__wow:__*",{files: [`./lookat/${tNumber}.jpg`]});


}


module.exports.help = {
    name : "lookat"
}