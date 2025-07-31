import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command }) => {
  const quoted = m.quoted ? m.quoted : m
  const mime = quoted.mimetype || quoted.msg?.mimetype || ''


  if (!/image\/(jpe?g|png)/i.test(mime)) {
    await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } })
    return m.reply(`🫵 Envía o *responde a una imagen* con el comando:\n*${usedPrefix + command}*`)
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

  conn.reply(m.chat, `🫵 Mejorando la calidad de la imagen....`, m, fake)  
    const media = await quoted.download()
    const ext = mime.split('/')[1]
    const filename = `mejorada_${Date.now()}.${ext}`

    const form = new FormData()
    form.append('image', media, { filename, contentType: mime })
    form.append('scale', '2')

    const headers = {
      ...form.getHeaders(),
      'accept': 'application/json',
      'x-client-version': 'web',
      'x-locale': 'es'
    }

    const res = await fetch('https://api2.pixelcut.app/image/upscale/v1', {
      method: 'POST',
      headers,
      body: form
    })

    const json = await res.json()

    if (!json?.result_url || !json.result_url.startsWith('http')) {
      throw new Error('No se pudo obtener la imagen mejorada desde Pixelcut.')
    }

    const resultBuffer = await (await fetch(json.result_url)).buffer()

    await conn.sendMessage(m.chat, {
      image: resultBuffer,
      caption: `
✨ Tu imagen ha sido mejorada al doble de resolución.
`.trim()
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (err) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    m.reply(`❌ Falló la mejora de imagen:\n${err.message || err}`)
  }
}

handler.help = ['hd']
handler.tags = ['herramientas', 'imagen']
handler.command = ['hd'];

export default handler