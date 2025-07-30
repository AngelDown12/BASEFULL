const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply(`╰⊱❗️⊱ *𝙐𝙎𝙊 𝙄𝙉𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝙊* ⊱❗️⊱╮

📌 Ejemplo de uso:
.brat Hola soy brutal 😈

⚠️ Agrega texto para generar el sticker.`)
  }

  // Mensaje de estado "⌛ Generando..."
  let status = await conn.reply(m.chat, '⌛ Generando tu sticker...', m)

  try {
    const url = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(args.join(' '))}`
    await conn.sendMessage(m.chat, {
      sticker: { url },
      packname: '',
      author: '',
    }, { quoted: m })

    // Reacciona con ✅
    await conn.sendMessage(m.chat, {
      react: {
        text: '✅',
        key: m.key
      }
    })
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Ocurrió un error al generar el sticker.', m)
  } finally {
    // Elimina el mensaje temporal si existe
    if (status?.key) conn.sendMessage(m.chat, { delete: status.key })
  }
}

handler.command = /^brat$/i
handler.help = ['brat <texto>']
handler.tags = ['sticker']

export default handler