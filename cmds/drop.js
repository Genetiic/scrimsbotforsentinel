
module.exports.run = async (bot, message, args) => {

    let rNumber = Math.floor((Math.random() * 51) +1);
    message.channel.send("*__Random Drop:__*",{files: [`./images/${rNumber}.jpg`]});


}


module.exports.help = {
    name : "drop"
}