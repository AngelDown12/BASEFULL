import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply('⚠️ Ingresa un texto para generar el sticker.')

  let user = global.db.data.users[m.sender]
  let f = user.packname || '' // sin packname si no hay
  let g = user.author || ''   // sin author si no hay

  try {
    let url = global.API('caliphdev', '/api/brat', { text })
    let stiker = await sticker(null, url, f, g)

    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    else throw '⚠️ No se pudo generar el sticker.'
  } catch (e) {
    console.error(e)
    return m.reply('❌ Hubo un error al generar el sticker.')
  }
}

handler.help = ['brat <texto>']
handler.tags = ['sticker']
handler.command = /^brat$/i

export default handler