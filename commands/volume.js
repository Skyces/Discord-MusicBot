const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "Untuk mengubah volume antrian lagu server",
    usage: "[volume]",
    aliases: ["v"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("Maaf, tapi Anda harus berada di voice channel untuk bermain music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Tidak ada yang diputar di server ini.", message.channel);
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    let xd = new MessageEmbed()
    .setDescription(`Saya mengatur volume ke: **${args[0]/5}/5**(itu akan dibagi 5)`)
    .setTitle("Manager Volume Server")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};
