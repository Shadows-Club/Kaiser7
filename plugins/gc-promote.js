const handler = async (m, {conn, usedPrefix, text}) => {

  if (isNaN(text) && !text.match(/@/g)) {

  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  if (!text && !m.quoted) return conn.reply(m.chat, `*${emojis} Mencione al usuario para promoverlo.*`, m);
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, '*⚠️ El usuario ingresado es incorrecto o el grupo está con LiD, por favor responde al mensaje del usuario que desea promover.*', m, rcanal);

  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
  } finally {
    conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    conn.reply(m.chat, `*✅ Órdenes Recibidas.*`, m);
  }
};
handler.help = ['*<@tag>*'].map((v) => 'promote ' + v);
handler.tags = ['gc'];
handler.command = /^(promote|promover|daradmin|darpoder|darpija)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;