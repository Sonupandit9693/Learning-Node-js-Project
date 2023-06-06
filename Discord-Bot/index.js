const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith('create')){
        const url = message.content.split("create")[1];
        return message.reply({
            content : "Gentareing short ID for" + url,
        })
    }
    message.reply({
        content: "Hii from boat;"
    })
//   console.log(message.content);
});

client.on("interactionCreate", (interaction)=>{
    console.log(interaction);
    interaction.reply("pong!!")
})

client.login(
  "MTExNTE4ODI0Mzg0NDAzODY1OQ.GwVoDS.vwkBGRPvHqoY2zSiJmXP6BS69tFSfG97Xm08TY"
);
