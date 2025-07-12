const handler = async (m, { conn, text, command, usedPrefix }) => {

  const warntext = `*${emojis} Etiqueta a un usuario para quitarle una advertencia.*\n$> {emojis} *ᴇᴊᴇᴍᴘʟᴏ:*\n*${usedPrefix + command}* @usuario*`;
  let who;

  if (m.isGroup) {
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);
  } else {
    who = m.chat;
  }

  if (!who || typeof who !== 'string' || !who.includes('@s.whatsapp.net')) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  // Asegurarse de que la estructura exista
  const groupData = global.db.data.users[m.chat] = global.db.data.users[m.chat] || {};
  groupData.warn = groupData.warn || {};

  // Verificar si el usuario tiene advertencias en este grupo
  const warns = groupData.warn[who] || 0;

  if (warns === 0) {
    return m.reply(`${emojis} El usuario no tiene advertencias en este grupo.`);
  }

  groupData.warn[who] -= 1;

  await m.reply(
    `♻️ *@${who.split`@`[0]}* se le quitó una advertencia.\n*Advertencias: ${groupData.warn[who]}/3*`,
    null,
    { mentions: [who] }
  );

  // (Opcional) Limpia advertencia global antigua si aún existe
  if (global.db.data.users[who]?.warn !== undefined) {
    delete global.db.data.users[who].warn;
  }
};

handler.command = ['delwarn', 'unwarn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;