const { REST, Routes }  = require("discord.js")

const commands = [
  {
    name: 'create',
    description: 'Genrated short url!',
  },
];

const rest = new REST({ version: '10' }).setToken('MTExNTE4ODI0Mzg0NDAzODY1OQ.GwVoDS.vwkBGRPvHqoY2zSiJmXP6BS69tFSfG97Xm08TY');

(async()=>{

    try {
      console.log('Started refreshing application (/) commands.');
    
      await rest.put(Routes.applicationCommands("1115188243844038659"), { body: commands });
    
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
}) ();