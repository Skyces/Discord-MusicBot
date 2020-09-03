const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "resume",
    description: "Untuk melanjutkan musik yang dijeda",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Lanjutkan music untuk Anda!")
      .setColor("YELLOW")
      .setTitle("Music telah Dilanjutkan!")
      return message.channel.send(xd);
    }
    return sendError("Tidak ada yang diputar di server ini.", message.channel);
  },
};
