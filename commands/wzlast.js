require('dotenv').config();
const API = require('call-of-duty-api')();

module.exports = {
  name: 'wzlast',
  description: 'Check players Warzone stats',
  async execute(client, message, args, Discord){
    if(!args[0]) return message.channel.send('Please enter a players username');
    if(!args[1]) return message.channel.send('Please enter a players platform');

    let username = process.env.COD_USERNAME;
    let password = process.env.COD_PASSWORD;

    try{
      await API.login(username, password);
      let data = await API.MWcombatwz(args[0], args[1]);

      const embed = new Discord.MessageEmbed()
      .setColor('5865ED')
      .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/a16524db-522f-4737-adf0-022e7b1489fa-profile_image-70x70.png')
      .setTitle('Warzone Stats BR')
      .setDescription('FULL TEAM STATS')
      .addFields(
        {name: 'Kills', value: data.summary.all.kills, inline: true},
        {name: 'K/D', value: (data.summary.all.kdRatio).toFixed(2), inline:true},
        {name: 'Gulag Win', value: data.summary.all.gulagKills, inline:true},
        {name: 'Score', value:  data.summary.all.score, inline:true},
        {name: 'SPM', value:(data.summary.all.scorePerMinute).toFixed(2), inline: true},
        {name: 'Deaths', value: data.summary.all.deaths},
        {name: 'Damage', value: data.summary.all.damageDone}
      )
      .setFooter('')

      message.channel.send(embed);

      console.log(data.summary.all);

    }catch(error){
      message.channel.send("Recheck tes affaires parce que j'te trouve pas!");
      throw error;
    }
  }
}