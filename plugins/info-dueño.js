let handler = async (m, { conn }) => {
  await m.react(emojis);

  // Crear contacto VCARD
  let list = [{
    displayName: "Maricielo",
    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Morchi\nitem1.TEL;waid=51906168999:51906168999\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:team.sunflare@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/shadows-club\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Perú 🇵🇪;;;;\nitem4.X-ABLabel:País\nEND:VCARD`
  }];

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contacto`,
      contacts: list
    }
  }, { quoted: m });
};

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|dueño)$/i;

export default handler;