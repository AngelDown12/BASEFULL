const handler = async (m, { conn }) =>
  conn.sendMessage(m.chat, { text: 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat) });


handler.customPrefix = /^(link)/i;
handler.command = new RegExp;
handler.command = ['link', 'enlace'];
handler.group = true;
handler.botAdmin = true;

export default handler;