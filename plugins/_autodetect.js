let WAMessageStubType = (await import(global.baileys)).default
import { promises as fs } from 'fs'
import path from 'path'

export async function before(m, { conn, participants }) {
  if (!m.messageStubType || !m.isGroup) return

  let usuario = `@${m.sender.split('@')[0]}`
  let fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  }

  let chat = global.db.data.chats[m.chat]
  const groupAdmins = participants.filter(p => p.admin)
  const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')

  if (chat.detect && m.messageStubType == 2) {
    const chatId = m.isGroup ? m.chat : m.sender
    const uniqid = chatId.split('@')[0]
    const sessionPath = './session/'
    const files = await fs.readdir(sessionPath)
    for (const file of files) {
      if (file.includes(uniqid)) {
        await fs.unlink(path.join(sessionPath, file))
        console.log('⚠️ Eliminación session (PreKey) que provocan el undefined en el chat')
      }
    }

  } else if (chat.detect && m.messageStubType == 21) {
    let nuevoNombre = m.messageStubParameters?.[0] || '🌐 Nombre no disponible'
    await conn.sendMessage(m.chat, {
      text: `${usuario} \`𝐇𝐀 𝐂𝐀𝐌𝐁𝐈𝐀𝐃𝐎 𝐄𝐋 𝐍𝐎𝐌𝐁𝐑𝐄 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 𝐀:\`\n\n> *${nuevoNombre}*`,
      mentions: [m.sender, ...groupAdmins.map(v => v.id)]
    }, {
      quoted: fkontak,
      ephemeralExpiration: 24 * 60 * 100,
      disappearingMessagesInChat: 24 * 60 * 100
    })

  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(m.chat, {
      text: `𝙇𝘼 𝙁𝙊𝙏𝙊 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 𝘼𝙃 𝙎𝙄𝘿𝙊 𝘾𝘼𝙈𝘽𝙄𝘼𝘿𝘼 𝙋𝙊𝙍: ${usuario}`,
      mentions: [m.sender]
    }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 24) {
    await conn.sendMessage(m.chat, {
      text: `𝙇𝘼 𝘿𝙀𝙎𝘾𝙍𝙄𝙋𝘾𝙄𝙊𝙉 𝘼𝙃 𝙎𝙄𝘿𝙊 𝘾𝘼𝙈𝘽𝙄𝘼𝘿𝘈 𝙋𝙊𝙍: ${usuario}`,
      mentions: [m.sender]
    }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 25) {
    let modo = m.messageStubParameters?.[0] === 'on' ? '𝐒𝐎𝐋𝐎 𝐀𝐃𝐌𝐈𝐍𝐒' : '𝐓𝐎𝐃𝐎𝐒'
    await conn.sendMessage(m.chat, {
      text: `📌 𝐀𝐇𝐎𝐑𝐀 *${modo}* 𝐏𝐔𝐄𝐃𝐄𝐍 𝐄𝐃𝐈𝐓𝐀𝐑 𝐋𝐀 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎`,
      mentions: [m.sender]
    }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 26) {
    let cerrado = m.messageStubParameters?.[0] === 'on'
    await conn.sendMessage(m.chat, {
      text: `𝐆𝐑𝐔𝐏𝐎 *${cerrado ? '𝐂𝐄𝐑𝐑𝐀𝐃𝐎 🔒' : '𝐀𝐁𝐈𝐄𝐑𝐓𝐎 🔓'}*\n${cerrado ? '𝐒𝐎𝐋𝐎 𝐀𝐃𝐌𝐈𝐍𝐒' : '𝐓𝐎𝐃𝐎𝐒'} 𝐏𝐔𝐄𝐃𝐄𝐍 𝐄𝐒𝐂𝐑𝐈𝐁𝐈𝐑`,
      mentions: [m.sender]
    }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 29) {
    let nuevoAdmin = m.messageStubParameters?.[0] || ''
    await conn.sendMessage(m.chat, {
      text: `@${nuevoAdmin.split('@')[0]} 𝘼𝙃𝙊𝙍𝘼 𝙀𝙎 𝘼𝘿𝙈𝙄𝙉\n\n🫵 𝘼𝘾𝘾𝙄𝙊𝙉 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝘿𝘼 𝙋𝙊𝙍: ${usuario}`,
      mentions: [m.sender, nuevoAdmin, ...groupAdmins.map(v => v.id)]
    }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 30) {
    let removido = m.messageStubParameters?.[0] || ''
    await conn.sendMessage(m.chat, {
      text: `@${removido.split('@')[0]} 𝘿𝙀𝙅𝘼 𝘿𝙀 𝙎𝙀𝙍 𝘼𝘿𝙈𝙄𝙉\n\n🫵 𝘼𝘾𝘾𝙄𝙊𝙉 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝘿𝘼 𝙋𝙊𝙍: ${usuario}`,
      mentions: [m.sender, removido, ...groupAdmins.map(v => v.id)]
    }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 72) {
    await conn.sendMessage(m.chat, {
      text: `${usuario} 𝐂𝐀𝐌𝐁𝐈𝐎 𝐋𝐀 𝐃𝐔𝐑𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄 𝐋𝐎𝐒 𝐌𝐄𝐍𝐒𝐀𝐉𝐄𝐒 𝐓𝐄𝐌𝐏𝐎𝐑𝐀𝐋𝐄𝐒 𝐀 *@${m.messageStubParameters?.[0]}*`,
      mentions: [m.sender]
    }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 123) {
    await conn.sendMessage(m.chat, {
      text: `${usuario} 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐎 𝐋𝐎𝐒 𝐌𝐄𝐍𝐒𝐀𝐉𝐄𝐒 𝐓𝐄𝐌𝐏𝐎𝐑𝐀𝐋𝐄𝐒.`,
      mentions: [m.sender]
    }, { quoted: fkontak })
  } else {
    console.log({
      messageStubType: m.messageStubType,
      messageStubParameters: m.messageStubParameters,
      type: WAMessageStubType[m.messageStubType]
    })
  }
}