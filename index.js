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

    axios(options).then(response => console.log(response.status))
}

const owners = ["927200461377929246", "737459216175857686"]

client.on("messageCreate", (message) => {
    if (!owners.includes(message.author.id)) return;
    if(message.content == "!reboot bot"){
        message.channel.send("Rebooting bot...");
        rebootServer(process.env.SERVER_ID);
        message.channel.send("Rebooted bot!");
        return;
    };
    if(message.content == "!reboot all") {
      message.channel.send("Rebooting all...");
        rebootServer(process.env.SERVER_ID);
        rebootServer(process.env.DB_ID)
        message.channel.send("Rebooted all!");
        return;
    };
    if(message.content == "!reboot db") {
      message.channel.send("Rebooting database...");
        rebootServer(process.env.DB_ID)
        message.channel.send("Rebooted database!");
        return;
    };
});

client.on("ready", () => {
    console.log("Online!")
})

client.login(process.env.BOT_TOKEN);