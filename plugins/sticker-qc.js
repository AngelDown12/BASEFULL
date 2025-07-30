import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text

    if (args.length >= 1) {
        text = args.join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else {
        return conn.reply(m.chat, `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮

𝘼𝙂𝙍𝙀𝙂𝙐𝙀́ 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊 𝙋𝘼𝙍𝘼 𝘾𝙍𝙀𝘼𝙍 𝙀𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍

𝘼𝘿𝘿 𝘼 𝙏𝙀𝙓𝙏 𝙏𝙊 𝘾𝙍𝙀𝘼𝙏𝙀 𝙏𝙃𝙀 𝙎𝙏𝙄𝘾𝙆𝙀𝙍`, m)
    }

    if (!text) return m.reply('⚠️ 𝙔 𝙀𝙇 𝙏𝙀𝙓𝙏𝙊?')

    const wordCount = text.trim().split(/\s+/).length
    if (wordCount > 30) return m.reply('⚠️ 𝙈𝘼́𝙓𝙄𝙈𝙊 30 𝙋𝘼𝙇𝘼𝘽𝙍𝘼𝙎')

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/ZJKqt.jpg')

    const obj = {
        type: "quote",
        format: "png",
        backgroundColor: "#000000",
        width: 512,
        height: 768,
        scale: 2,
        messages: [{
            entities: [],
            avatar: true,
            from: {
                id: 1,
                name: m.name,
                photo: {
                    url: pp
                }
            },
            text: text,
            replyMessage: {}
        }]
    }

    const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const buffer = Buffer.from(json.data.result.image, 'base64')
    const stiker = await sticker(buffer, false, global.packname, global.author)

    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i

export default handler