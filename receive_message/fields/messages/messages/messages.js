import mongodb from "../../../../MongoDB/Mongodb.js";
import send from "../../../../Send/Send.js";

import text from "./text.js";
// import sticker from "./sticker.js";
// import interactive from "./interactive.js";

/**
 * @author VAMPETA
 * @brief TRATA O CASO DE req.body.entry[n].changes[n].field === "messages" && req.body.entry[n].changes[n].value === true
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function messages(value, account) {
	for (const message of value.messages) {
		try {
			await send.read(account, message.id, message.from);
			switch (message.type) {
				case ("text"):
					await text(message, account);
					break;
	
				// case ("sticker"):
				// 	await sticker(value, message, account);
				// 	break;
	
				// case ("interactive"):
				// 	await interactive(value, message, account);
				// 	break;
	
				default:
					await mongodb.saveTextReceived(account.idPhone, message.id, message.from, `Mensagem não suportada: ${message.type}`, message.timestamp);
					await send.text(account, message.from, account.messageNotSupported);
			}
		} catch (error) {
			await mongodb.saveError(account.idPhone, `Error na funcao "messages": ${error}`);
		}
	}
}

// text					messages[n].text
// image				messages[n].image
// video				messages[n].video
// audio				messages[n].audio
// document				messages[n].document
// sticker				messages[n].sticker
// location				messages[n].location
// contacts				messages[n].contacts[]
// interactive			messages[n].interactive
// button				messages[n].button
// reaction				messages[n].reaction
// ephemeral			messages[n].ephemeral