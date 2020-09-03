const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "pause",
    description: "Untuk menghentikan musik",
    usage: "",
    aliases: [""],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let xd = new MessageEmbed()
      .setDescription("⏸ Jeda musik untuk Anda!")
      .setColor("YELLOW")
      .setTitle("Musik telah dijeda!")
      return message.channel.send(xd);
    }
    return sendError("Tidak ada yang diputar di server ini.", message.channel);
  },
};
