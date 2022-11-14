const { GatewayIntentBits, Client, Partials }= require("discord.js");
const axios = require('axios')
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages], 
    partials: [Partials.Message]
}); 

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


client.on("messageCreate", async (message) => {
    if (message.author.id !== 927200461377929246) return;
    if(message.content === "!reboot"){
        await message.channel.send("Rebooting server").then(async () => {
            try {
                await rebootServer(process.env.SERVER_ID);
                await message.edit("Rebooted!")
            } catch (error) {
                console.log(error);
                await message.edit("Reboot failed!")
            }
        })
        return;
    };
});

client.on("ready", () => {
    console.log("Online!")
})

client.login(process.env.BOT_TOKEN);