import sendText from "../../../../send_message/send-text.js";
import responseMessage from "../../../../send_message/response-message.js";

import text from "./text.js";
import sticker from "./sticker.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "interactive"
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
async function interactive(value, message) {
	responseMessage(message.id, message.from, `Opção selecionada: ${message.interactive[message.interactive.type].title}`);
}

/**
 * @author VAMPETA
 * @brief TRATA O CASO DE req.body.entry[n].changes[n].field === "messages" && req.body.entry[n].changes[n].value === true
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function messages(value, account) {
	for (const message of value.messages) {							// COLOCAR UM TRY CATCH
		switch (message.type) {
			case ("text"):
				await text(value, message, account);
				break;

			// case ("sticker"):
			// 	await sticker(value, message, account);
			// 	break;

			// case ("interactive"):
			// 	await interactive(value, message, account);
			// 	break;

			default:
				await sendText(message.from, account.messageNotSupported, account);
		}
	}
}

// text					messages[n].text.body
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