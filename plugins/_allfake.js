import fetch from 'node-fetch'

export async function before(m, { conn }) {
//let img = await (await fetch(`https://tinyurl.com/2c5hk765`)).buffer()
let img = catalogo
 global.fake = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "",
      serverMessageId: 100,
      newsletterName: '',
    },
	    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: 'Hola',
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: 'https://files.catbox.moe/ntyp5r.jpg',
		           sourceUrl: canal,
		           mediaType: 1,
                   renderLargerThumbnail: false
	    },
    },
  }

 global.adReply = {
	    contextInfo: { 
             forwardingScore: 9999, 
                 isForwarded: false, 
                    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: textbot,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: img,
                    thumbnail: img,
		           sourceUrl: canal,
		           mediaType: 1,
                   renderLargerThumbnail: true
				}
			}
		}

global.rcanal = {
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "",
serverMessageId: 100,
newsletterName: '',
},
externalAdReply: { 
showAdAttribution: true,
title: '𝗔𝗻𝗴𝗲𝗹 - 𝗕𝗼𝘁',
body: 'ford is',
previewType: "PHOTO",
thumbnailUrl: 'https://files.catbox.moe/ntyp5r.jpg',
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
},},}
	
}
