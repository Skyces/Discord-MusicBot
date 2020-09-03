const { MessageEmbed } = require("discord.js");

const sendError = require("../util/error");

module.exports = {

  info: {

    name: "queue",

    description: "Untuk menampilkan antrian lagu server",

    usage: "",

    aliases: ["q", "list", "songlist", "song-list"],

  },

  run: async function (client, message, args) {

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) return sendError("Tidak ada yang diputar di server ini.", message.channel);

    let queue = new MessageEmbed()

    .setTitle("Server Songs Queue")

    .setColor("BLUE")

    .addField("Sedang Dimainkan", serverQueue.songs[0].title, true)

    .addField("Text Channel", serverQueue.textChannel, true)

    .addField("Voice Channel", serverQueue.voiceChannel, true)

    .setDescription(serverQueue.songs.map((song) => {

      if(song === serverQueue.songs[0])return

      return `**-** ${song.title}`

    }).join("\n"))

    .setFooter("Saat ini Volume Server adalah "+serverQueue.volume)

    if(serverQueue.songs.length === 1)queue.setDescription(`Tidak ada lagu untuk diputar selanjutnya tambahkan lagu \`\`${client.config.prefix}play <nama lagu>\`\``)

    message.channel.send(queue)

  },

};
