import mongodb from "../../../MongoDB/Mongodb.js";
import send from "../../../Send/Send.js";

import reaction from "./reaction.js";
import text from "./text.js";
import sticker from "./sticker.js";
import audio from "./audio.js";
import image from "./image.js";
import video from "./video.js";
import location from "./location.js";
import contacts from "./contacts.js";
import document from "./document.js";
import interactive from "./interactive.js";

/**
 * @author VAMPETA
 * @brief TRATA O CASO DE req.body.entry[n].changes[n].field === "messages" && req.body.entry[n].changes[n].value === true
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
*/
export default async function messages(account, value) {
	for (const message of value.messages) {
		try {
			if (!(await mongodb.saveWamid(account.idPhone, message))) continue;
			await mongodb.saveContact(account.idPhone, message.from, value.contacts);
			await send.read(account, message.id, message.from);
			switch (message.type) {
				case ("reaction"):
					await reaction(account, message);
					break;

				case ("text"):
					await text(account, message);
					break;

				case ("sticker"):
					await sticker(account, message);
					break;

				case ("audio"):
					await audio(account, message);
					break;

				case ("image"):
					await image(account, message);
					break;

				case ("video"):
					await video(account, message);
					break;

				case ("location"):
					await location(account, message);
					break;

				case ("contacts"):
					await contacts(account, message);
					break;

				case ("document"):
					await document(account, message);
					break;

				case ("interactive"):
					await interactive(account, message);
					break;
	
				default:
					await mongodb.saveTextReceived(account.idPhone, { id: message.id, from: message.from, timestamp: message.timestamp, type: "text", text: { body: `Mensagem não suportada: ${message.type}` } });
					if (account.bot.messageNotSupported) await send.text(account, message.from, { text: { body: account.bot.messageNotSupported } });
			}
		} catch (error) {
			await mongodb.saveError(account.idPhone, `Error na funcao "messages": ${error}`);
		}
	}
}

// reaction				messages[n].reaction
// text					messages[n].text
// sticker				messages[n].sticker
// audio				messages[n].audio
// image				messages[n].image
// video				messages[n].video
// document				messages[n].document
// location				messages[n].location
// contacts				messages[n].contacts[]
// interactive			messages[n].interactive
// button				messages[n].button
// ephemeral			messages[n].ephemeral