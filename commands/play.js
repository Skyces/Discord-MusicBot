const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "play",
    description: "Untuk Bermain Music,
    usage: "<Nama Lagu>",
    aliases: ["p"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("Maaf, tetapi Anda harus menggunakan voice channel untuk memutar music!", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return sendError("Saya tidak dapat terhubung ke voice channel anda, pastikan saya memiliki izin yang tepat!", message.channel);
    if (!permissions.has("SPEAK"))return sendError("Saya tidak dapat berbicara dalam voice channel hal ini, pastikan saya memiliki izin yang tepat!", message.channel);

    var searchString = args.join(" ");
    if (!searchString)return sendError("Anda tidak berpengaruh ingin saya mainkan", message.channel);
    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString)
    if(searched.videos.length === 0)return sendError("Looks like i was unable to find the song on YouTube", message.channel)
    var songInfo = searched.videos[0]

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Lagu telah ditambahkan ke antrian", song.req.displayAvatarURL({ dynamic: true }))
      .setThumbnail(song.img)
      .setColor("YELLOW")
      .addField("Nama", song.title, true)
      .addField("Durasi", song.duration, true)
      .addField("Diminta Oleh", song.req.tag, true)
      .setFooter(`Tampilan: ${song.views} | ${song.ago}`)
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true,
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        sendError("Meninggalkan voice channel karena menurut saya tidak ada lagu dalam antrian. ", message.channel)
        queue.voiceChannel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
      .setAuthor("Mulai Memainkan Music!", song.req.displayAvatarURL({ dynamic: true }))
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Name", song.title, true)
      .addField("Durasi", song.duration, true)
      .addField("Diminta Oleh", song.req.tag, true)
      .setFooter(`Tampilan: ${song.views} | Lalu: ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true)
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return sendError(`Saya tidak bisa bergabung dengan voice channel: ${error}`, message.channel);
    }
  }
};
