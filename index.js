const Discord = require("discord.js");
const fs = require("fs");
var safeEval = require("safe-eval");
var config = fs.readFileSync("config.json");
var isReady = true;
var VC;
var opus = require('opusscript');
var cheerio = require("cheerio");
var request = require("request");
config = JSON.parse(config);
const client = new Discord.Client();
const isSelfBot = false;
const token = config.token;
const selftoken = config.selftoken;
const songs = ["./music/sico.mp3", "./music/mo.mp3", "./music/shark.mp3"]
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
  .setColor("#00FF00")
  .setTitle("Self Help")
  .setAuthor(
    "Yeeter Teeter",
    "https://media1.tenor.com/images/1216e4ee9d73a197912077c5a832f3f2/tenor.gif",
    "https://talll.us"
  )
  .setDescription("gamer bot help yes?")
  .setThumbnail(
    "https://media1.tenor.com/images/1216e4ee9d73a197912077c5a832f3f2/tenor.gif"
  )
  .addField("y!ping", "Shows the bot's current ping.")
  .addField("y!8ball [question]", "Ask The Magic 8-Ball a question.")
  .addField(
    "y!eval [statement to evaluate]",
    "Can do math and other things."
  )
  .addField(
    "y!themesong",
    "Plays a song. Current songs are Baby Shark, Sicko Mode and Mo Bamba"
  )
  .setTimestamp()
  .setFooter(
    "Talll's bot",
    "https://media1.tenor.com/images/1216e4ee9d73a197912077c5a832f3f2/tenor.gif"
  );

client.once("ready", () => {
  console.log("Ready!, user is " + client.user.tag);
});

function logcommand(message) {
  console.log(message.author.username + ": " + message.content);
}

function handlemessage(message) {
  switch (message.content) {
    case "y!ping": // returns the bots ping
      message.channel.send("Pong! " + client.ping + " ms");
      logcommand(message);
      break;
    case "y!help":
      message.author.send(helpEmbed);
      message.channel.send('Command list was sent to your dms.')
      break;
      case "y!sickobamba":

      break;
    default:
      if (message.content.startsWith("y!8ball")) {
        // magic 8 ball command
        message.channel.send(
          rsp8ball[Math.floor(Math.random() * rsp8ball.length)]
        );
        logcommand(message);
      } else {
        if (message.content.startsWith("y!eval")) {
          var l_name = message.content.substr(message.content.indexOf(" ") + 1);
          try {
            message.channel.send(safeEval(l_name));
          } catch (error) {
            try {
              if (error.toString() == null) {} else {
                message.channel.send(error.toString());
              }
            } catch (err) {
              console.error(err);
            }
          }
        } else {
          if (message.content.startsWith("y!image")) {
            var parts = message.content.split(" ");
            image(message, parts);
          } else {
            if (message.content.startsWith("y!sickobamba")) {
              if (isReady){
                VC = message.member.voiceChannel;
                if (!VC)
                    return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
            VC.join()
                .then(connection => {
                  var parts = message.content.split(" ");
                  var search = parts.slice(1).join(" ");
                  if (search.toLowerCase() == "sicko mode"){
const dispatcher = connection.playFile(songs[0]);
                  }else{
                    if (search.toLowerCase() == "mo bamba"){
const dispatcher = connection.playFile(songs[1]);
                    }else{
                      if (search.toLowerCase() == "baby shark"){
  const dispatcher = connection.playFile(songs[2]);
                      }else{
  message.reply("Not a valid option. Try Sicko Mode, Mo Bamba or baby shark.")
                      }

                    }
                  }

                    dispatcher.on("end", end => {VC.leave()});
                })
                .catch(console.error);
              }
            }else{
              if (message.content.startsWith("y!disconnect")) {
                try{
                  VC.leave();
                } catch (err) {
                  console.log(err);
                }

              }else{
                if (message.content.startsWith("y!")) {
                  message.channel.send("Error: Invalid Command");
                }
              }


          }
          }

        }
      }
  }
}
client.on("message", message => {
  handlemessage(message);
});
//NONE OF THIS IS SKIDDED I PROMISE
function image(message, parts) {
  var search = parts.slice(1).join(" ");
  var options = {
    url: "http://results.dogpile.com/serp?qc=images&q=" + search,
    method: "GET",
    headers: {
      "Accept": "text/html",
      "User-Agent": "Chrome/YeetBOT"
    }
  };
  request(options, function(error, response, responseBody) {
    if (error) {
      return;
    }
    $ = cheerio.load(responseBody);
    var links = $(".image a.link");
    var urls = new Array(links.length).fill(1).map((v, i) => links.eq(i).attr("href"));
    if (!urls.length) {
      return;
    }
    message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
  });
}
 client.on('error', console.error);
client.login(token);

//deprecated stuff
