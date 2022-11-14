const Discord = require("discord.js");
const axios = require('axios')
require('dotenv').config();

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_MESSAGES"]}); 

async function rebootServer(serverId) {
    const options = {
      url: `https://${process.env.PANEL_URL}/api/client/servers/${serverId}/power`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
    },
      data: {
        signal: 'restart'
      }
    };

    axios(options)
    .then(response => {
        console.log(response.status);
    });
}


client.on("messageCreate", (message) => {
    if (message.author.id != 927200461377929246) return;
    if(message.content == "!reboot"){
        message.channel.send("Rebooting...");
        rebootServer(process.env.SERVER_ID);
        message.channel.send("Rebooted!");
        return;
    };
});

client.on("ready", () => {
    console.log("Online!")
})

client.login(process.env.BOT_TOKEN);