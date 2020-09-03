const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "nowplaying",
    description: "Untuk menampilkan musik yang sedang diputar di server ini",
    usage: "",
    aliases: ["np"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Tidak ada yang diputar di server ini.", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Sedang dimainkan", song.req.displayAvatarURL({ dynamic: true }))
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Nama", song.title, true)
      .addField("Durasi", song.duration, true)
      .addField("Diminta oleh", song.req.tag, true)
      .setFooter(`Tampilan: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
};
