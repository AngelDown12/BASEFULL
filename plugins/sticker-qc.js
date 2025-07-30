import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let text

  // Verifica si hay texto en los argumentos o en el mensaje citado
  if (args.length >= 1) {
    text = args.join(" ")
  } else if (m.quoted?.text) {
    text = m.quoted.text
  } else {
    // ❌ Si no hay texto ni mensaje citado
    throw `╭━━〔 ❗️ *USO INCORRECTO* ❗️ 〕━━⬣
┃ ✨ Usa el comando así:
┃ ⤷ *${usedPrefix + command} tu mensaje*
┃ 
┃ Ejemplo:
┃ ⤷ *${usedPrefix + command} Hola, ¿cómo estás?*
╰━━━━━━━━━━━━━━━━━━━━⬣`
  }

  if (!text) return m.reply('⚠️ Escribe algo para generar el sticker.')
  if (text.length > 30) return m.reply('⚠️ El texto debe tener máximo *30 caracteres*.')

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
      text: text
      // ✅ No se incluye replyMessage
    }]
  }

  const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const buffer = Buffer.from(json.data.result.image, 'base64')
  let stiker = await sticker(buffer, false, global.packname, global.author)
  if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i

export default handler