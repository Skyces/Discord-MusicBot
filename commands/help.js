const { MessageEmbed } = require('discord.js')

module.exports = {

    info: {

        name: "help",

        description: "Untuk menampilkan semua perintah",

        usage: "[command]",

        aliases: ["commands", "h"]

    },

    run: async function(client, message, args){

        var allcmds = "";

        client.commands.forEach(cmd => {

            let cmdinfo = cmd.info

            allcmds+="``"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"`` ~ "+cmdinfo.description+"\n"

        })

        let embed = new MessageEmbed()

        .setAuthor("Perintah dari "+client.user.username, client.user.displayAvatarURL())

        .setColor("BLUE")

        .setDescription(LIST COMMANDS)

        .setFooter(`Untuk mendapatkan info setiap perintah yang bisa Anda lakukan ${client.config.prefix}help [command] | BOT CREATE BY: Juna#7048`)

        if(!args[0])return message.channel.send(embed)

        else {

            let cmd = args[0]

            let command = client.commands.get(cmd)

            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))

            if(!command)return message.channel.send("Perintah Tidak Diketahui")

            let commandinfo = new MessageEmbed()

            .setTitle("Command: "+command.info.name+" info")

            .setColor("YELLOW")

            .setDescription(`

Nama: ${command.info.name}

Description: ${command.info.description}

Gunakan: \`\`${client.config.prefix}${command.info.name } ${command.info.usage}\`\`

Alias: ${command.info.aliases.join(", ")}

`)

            message.channel.send(command info)

        }

    }

}
