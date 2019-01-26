const Discord = require('discord.js');
const fs = require('fs');
var safeEval = require('safe-eval');
var config = fs.readFileSync("config.json");
config = JSON.parse(config);
const client = new Discord.Client();
const isSelfBot = false;
const token = config.token;
const selftoken = config.selftoken;
const rsp8ball = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes – definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Don’t count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again"
];
const helpEmbed = new Discord.RichEmbed()
    .setColor('#00FF00')
    .setTitle('Self Help')
    .setAuthor('Yeeter Teeter', 'https://media1.tenor.com/images/1216e4ee9d73a197912077c5a832f3f2/tenor.gif', 'https://talll.us')
    .setDescription('gamer bot help yes?')
    .setThumbnail('https://media1.tenor.com/images/1216e4ee9d73a197912077c5a832f3f2/tenor.gif')
    .addField('y!ping', 'Shows the bot\'s current ping.')
    .addField('y!8ball [question]', 'Ask the magic 8 ball a question.')
    .addField('y!deleteall', 'Deletes all of the last messages in this channel sent by you')
    .setTimestamp()
    .setFooter('Talll\'s bot', 'https://media1.tenor.com/images/1216e4ee9d73a197912077c5a832f3f2/tenor.gif');

client.once('ready', () => {
    console.log('Ready!, user is '  + client.user.tag);
});

function logcommand(message) {
    console.log(message.author.username + ": " + message.content)
}

function handlemessage(message) {
    switch (message.content) {
        case "y!ping": // returns the bots ping
            message.channel.send("Pong! " + client.ping + " ms");
            logcommand(message);
            break;
        case "y!help":
            message.channel.send(helpEmbed);
            break;
        default:
            if (message.content.startsWith("y!8ball")) { // magic 8 ball command
                message.channel.send(rsp8ball[Math.floor(Math.random() * rsp8ball.length)])
                logcommand(message)
            } else {
              if (message.content.startsWith("y!eval")){
                var l_name = message.content.substr(message.content.indexOf(' ') + 1);
                try{
                  message.channel.send(safeEval(l_name))
                }
                catch (error) {
                  try{
                    if (error.toString() == null) {

                    }else{
                      message.channel.send(error.toString())
                    }

                  }
                  catch (err){
                    console.error(err);
                  }

                }


              }else{
                if (message.content.startsWith("y!")) {
                    message.channel.send("Error: Invalid Command");
                }
              }

            }
    }
}
client.on('message', message => {
    handlemessage(message)
});

    client.login(token);

//deprecated stuff
