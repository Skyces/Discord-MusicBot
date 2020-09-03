const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "stop",
    description: "Untuk menghentikan music dan membersihkan antrian",
    usage: "",
    aliases: ["leave"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Maaf, tapi Anda harus berada di voice channel untuk bermain music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Tidak ada permainan yang bisa saya hentikan untuk Anda.", message.channel);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Berhasil Menghentikan Music!");
    message.react("✅")
  },
};
