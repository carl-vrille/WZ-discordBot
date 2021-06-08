require('dotenv').config();
const API = require('call-of-duty-api')({ platform: "acti" });

module.exports = {
  name: 'last20',
  description: 'Check players Warzone stats',
  async execute(client, message, args, Discord){
    if(!args[0]) return message.channel.send('Faut que tu mettes ton username');


    const username = process.env['COD_USERNAME']
    const password = process.env['COD_PASSWORD']

    try{
      await API.login(username, password);
      let data = await API.MWcombatwz(args[0]);

      const embed = new Discord.MessageEmbed()
      .setColor('5865ED')
      .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/a16524db-522f-4737-adf0-022e7b1489fa-profile_image-70x70.png')
      .setTitle('Warzone Battle Royale')
      .setDescription(`Statisques des 20 derniers drops pour ${args[0]}`)
      .addFields(
        {name: 'Kills', value: data.summary.all.kills, inline: true},
        {name: 'Deaths', value: data.summary.all.deaths, inline: true},
        {name: 'K/D', value: (data.summary.all.kdRatio).toFixed(2), inline:true},
        {name: 'Damage', value: data.summary.all.damageDone, inline: true},
        {name: 'Headshot %', value: (data.summary.all.headshotPercentage).toFixed(2), inline: true},
        {name: 'K/Games', value: data.summary.all.killsPerGame, inline:true},
        {name: 'Time', value: (parseFloat(data.summary.all.timePlayed / 3600).toFixed(2) + ' hrs'), inline:true},
        {name: 'Score', value: data.summary.all.score, inline:true},
        {name: 'SPM', value:(data.summary.all.scorePerMinute).toFixed(2), inline: true},
      )
      .setFooter('')

      message.channel.send(embed);

      console.log(data.summary.all);

    }catch(error){
      message.channel.send("C'est ton username complet du jeu - celui qu'on voit dans le lobby");
      throw error;
    }
  }
}