const path = require('path')
const execSync = require('child_process').execSync;
const P = require('pino')
const fetch = require('node-fetch')
const { 
default: makeWASocket, 
DisconnectReason, 
AnyMessageContent, 
delay,
proto,
jidDecode,
useSingleFileAuthState,
generateForwardMessageContent, 
generateWAMessageFromContent,
downloadContentFromMessage, 
generateMessageID,
makeInMemoryStore
} = require('@adiwajshing/baileys')
const baileys = require('@adiwajshing/baileys')
const fs = require("fs")
const fsx = require('fs-extra')
const axios = require('axios')
const { Boom } = require("@hapi/boom")
const { state, loadState, saveState } = useSingleFileAuthState("./chan.json")
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })

function getConf(data) {
 fetch(__dirname + '/custom.json')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
      const baku = JSON.parse(json);
      const hasil = baku.data;
     return hasil
  });
}


const getVersionWaweb = () => {
    let version
    try {
        let { data } = axios.get('https://web.whatsapp.com/check-update?version=1&platform=web')
        version = [data.currentVersion.replace(/[.]/g, ', ')]
    } catch {
        version = [2, 2204, 13]
    }
    return version
}

const startSock = () => {
const chan = makeWASocket({
    logger: P({ level: 'fatal' }),
    printQRInTerminal: true,
    auth: state,
    browser: ["AntiGamblingAgent By justClizz","Safari","1.0.0"],
    version: getVersionWaweb() || [2, 2204, 13]
})

chan.ev.on('messages.upsert', async m => {
const msg = m.messages[0]
const from = msg.key.remoteJid
const content = JSON.stringify(msg.message)

const type = Object.keys(msg.message)[0]
const text = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation: (type == 'imageMessage') && msg.message.imageMessage.caption ? (msg.message.imageMessage.caption || ''): (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption: (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text: ''
const isiChat = text

if (!msg.key.fromMe && m.type === 'notify') {

if (isiChat.includes("bet") || isiChat.includes("slot") || isiChat.includes("Slot") || isiChat.includes("judi") || isiChat.includes("Judi")) {
 chan.sendMessage(msg.key.remoteJid, { text: `${getConf(message)}`})
 await delay(800)
 if (getConf(block) === "true"{
 await chan.updateBlockStatus(msg.key.remoteJid, "block")
 }
}             
}
})

chan.ev.on('creds.update', saveState)
}

startSock()
