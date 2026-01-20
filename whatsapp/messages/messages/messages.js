import mongodb from "../../../MongoDB/Mongodb.js";
import send from "../../../Send/Send.js";

import text from "./text.js";
import interactive from "./interactive.js";
import reaction from "./reaction.js";
// import sticker from "./sticker.js";

/**
 * @author VAMPETA
 * @brief TRATA O CASO DE req.body.entry[n].changes[n].field === "messages" && req.body.entry[n].changes[n].value === true
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
*/
export default async function messages(account, value) {
	for (const message of value.messages) {
		try {
			await mongodb.saveContact(account.idPhone, message.from, value.contacts);
			await send.read(account, message.id, message.from);
			switch (message.type) {
				case ("text"):
					await text(account, message);
					break;

				case ("interactive"):
					await interactive(account, message);
					break;

				case ("reaction"):
					await reaction(account, message);
					break;

				// case ("sticker"):
				// 	await sticker(value, message, account);
				// 	break;
	
				default:
					await mongodb.saveTextReceived(account.idPhone, { id: message.id, from: message.from, timestamp: message.timestamp, type: "text", text: { body: `Mensagem não suportada: ${message.type}` } });
					if (account.bot.messageNotSupported) await send.text(account, message.from, { text: { body: account.bot.messageNotSupported } });
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