require('dotenv').config();
const API = require('call-of-duty-api')({ platform: "acti" });


module.exports = {
  name: 'overall',
  description: "Check players Warzone stats",
  async execute(client, message, args, Discord){
    if(!args[0]) return message.channel.send('Faut que tu mettes ton username');
    //if(!args[1]) return message.channel.send('Faut que tu mettes la plateform');

    const username = process.env['COD_USERNAME']
    const password = process.env['COD_PASSWORD']

    try{
      await API.login(username, password);
      let data = await API.MWBattleData(args[0]);

      const embed = new Discord.MessageEmbed()
      .setColor('5865ED')
      .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/a16524db-522f-4737-adf0-022e7b1489fa-profile_image-70x70.png')
      .setTitle('Warzone Battle Royale')
      .setDescription(`Statisques Overall ${args[0]}`)
      .addFields(
        {name: 'Kills', value: data.br.kills, inline: true},
        {name: 'Deaths', value: data.br.deaths, inline: true},
        {name: 'Ratio', value: (data.br.kdRatio).toFixed(2), inline:true},
        {name: 'Top 10', value: data.br.topTen, inline:true},
        {name: 'top 5', value: data.br.topFive, inline:true},
        {name: 'Wins', value: data.br.wins, inline:true},
        {name: 'Headshot %', value: (data.br.headshotPercentage).toFixed(2), inline: true},
        {name: 'Time', value: (parseFloat(data.br.timePlayed) / 3600).toFixed(2) + ' hrs', inline: true},
        {name: 'SPM', value:(data.br.scorePerMinute).toFixed(2), inline: true}
      )
      .setFooter('')

      message.channel.send(embed);

      console.log(data.br);

    } catch(error){
        message.channel.send("C'est ton username complet du jeu - celui qu'on voit dans le lobby");
        throw error;
    }
  }
}