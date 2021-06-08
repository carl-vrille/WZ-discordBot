require('dotenv').config();
const API = require('call-of-duty-api')({ platform: "acti" });

module.exports = {
  name: 'week',
  description: 'Check players Warzone stats',
  async execute(client, message, args, Discord){
    if(!args[0]) return message.channel.send('Faut que tu mettes ton username');
    //if(!args[1]) return message.channel.send('Faut que tu mettes la plateform');
    
    const username = process.env['COD_USERNAME']
    const password = process.env['COD_PASSWORD']

    try{
      await API.login(username, password);
      let data = await API.MWweeklystats(args[0]);

      const embed = new Discord.MessageEmbed()
      .setColor('5865ED')
      .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/a16524db-522f-4737-adf0-022e7b1489fa-profile_image-70x70.png')
      .setTitle('Warzone Battle Royale')
      .setDescription(`Statisques pour les 7 derniers jour de ${args[0]}`)
      .addFields(
        {name: 'Kills', value: data.wz.all.properties.kills, inline: true},
        {name: 'Deaths', value: data.wz.all.properties.deaths, inline: true},       
        {name: 'Ratio', value: (data.wz.all.properties.kdRatio).toFixed(2), inline: true},
        {name: 'Dommage', value:(data.wz.all.properties.damageDone), inline: true},
        {name: 'Headshot %', value: (data.wz.all.properties.headshotPercentage).toFixed(2), inline: true},
        {name: 'K/Games', value: (data.wz.all.properties.killsPerGame).toFixed(2), inline: true},
        {name: 'Games', value: data.wz.all.properties.matchesPlayed, inline:true},
        {name: 'Time', value: (parseFloat(data.wz.all.properties.timePlayed / 3600).toFixed(2) + ' hrs'), inline: true},
        {name: 'SPM', value:(data.wz.all.properties.scorePerMinute).toFixed(2), inline: true},      
      )
      .setFooter('')

      message.channel.send(embed);

      console.log(data.wz.all.properties);

    }catch(error){
      message.channel.send("C'est ton username complet du jeu - celui qu'on voit dans le lobby");
      throw error;
    }
  }
}