let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}

  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
  case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break

     case 'autoread':
    case 'autoleer':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break

    case 'document':
    case 'documento':
    isUser = true
    user.useDocument = isEnable
    break

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break

   case 'antidelete': 
     case 'antieliminar': 
     case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
       global.dfail('admin', m, conn)
       throw false
     }}
     chat.delete = isEnable
     break

      case 'antiprivado':
      isAll = true
      if (!isROwner) {
      global.dfail('rowner', m, conn)
      throw false
      }
      bot.antiPrivate = isEnable
      break

      case 'nsfw':
      case 'modohorny':
       if (m.isGroup) {
         if (!(isOwner)) {
           global.dfail('rowner', m, conn)
            throw false
           }}
    chat.nsfw = isEnable          
    break

  case 'audios':
    case 'audiosbot':
    case 'botaudios':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.audios = isEnable
      break

 case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.modoadmin = isEnable
      break

  case 'reaction':
    case 'reacciones':
    case 'emojis':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.reaction = isEnable
      break

  case 'detect':
    case 'configuraciones':
    case 'avisodegp':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break


case 'autoaceptar': case 'aceptarnuevos':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.autoAceptar = isEnable
break


     case 'antiarabes':
     case 'antinegros':
       if (m.isGroup) {
         if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
           throw false
         }}
       chat.onlyLatinos = isEnable  
       break
    default:
      if (!/[01]/.test(command)) return m.reply(`
*• Ingresa una opción para habilitar o deshabilitar*

*≡ Lista de opciones*
*Tipo :* welcome
*Descripción :* Des/Activa la *Bienvenida* y *Despedida* para Grupos.

*Tipo :* nsfw 
*Descripción :* Des/Activa los comandos *+18* para Grupos.

*Tipo :* antiarabes 
*Descripción :* Des/Activa el *AntiArabes* para eliminar números fake en el grupo.

*Tipo :* antilink 
*Descripción :* Des/Activa el *AntiLink* para eliminar a la persona que manda un link de WhatsApp.

*Tipo :* autoread 
*Descripción :* Des/Activa el *AutoRead* para que el bot lea los mensajes.

*Tipo :* modoadmin
*Descripción :* Des/Activa el *Modoadmin* para el que el bot solo sea usado por los admins.

*Tipo :* detect
*Descripción :* Des/Activa el *detect* para el que el bot de avisos sobre actualizaciones de grupos.

*Tipo :* document 
*Descripción :* Des/Activa la *Descarga En Documentos* para el Usuario

*${emojis} Ejemplo:*
*${usedPrefix + command}* detect
`.trim())
      throw false
  }
   m.reply(`*${emojis} La opción ${type} fue ${isEnable ? 'activada' : 'desactivada'} exitosamente para ${isAll ? 'este Bot' : isUser ? '' : 'este Chat*'}`)
}

handler.help = ['enable', 'disable']
handler.tags = ['nable']
handler.command = /^(enable|disable|on|off|1|0)$/i

export default handler