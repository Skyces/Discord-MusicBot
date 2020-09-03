const sendError = require("../util/error");

module.exports = {
  info: {
    name: "skip",
    description: "Untuk melewati lagu",
    usage: "",
    aliases: ["s"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Maaf, tapi Anda harus berada di voice channel untuk bermain music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Tidak ada pemutaran yang bisa saya lewatkan untuk Anda.", message.channel);
    serverQueue.connection.dispatcher.end("Berhasil Melewati music");
    message.react("✅")
  },
};
