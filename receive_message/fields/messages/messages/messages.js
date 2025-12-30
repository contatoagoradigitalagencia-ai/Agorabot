import axios from "axios";

import readMessage from "../../../../send_message/read-message.js";
import sendText from "../../../../send_message/send-text.js";
import sendImage from "../../../../send_message/send-image.js";
import sendLocation from "../../../../send_message/send-location.js";
import sendButons from "../../../../send_message/send-buttons.js";
import sendList from "../../../../send_message/send-list.js";
import reactMessage from "../../../../send_message/react-message.js";
import responseMessage from "../../../../send_message/response-message.js";

import { Chat, Message } from "../../../../MongoDB/schema.js";
import { saveTextSent } from "../../../../MongoDB/text.js";

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
*/
export default async function messages(value) {
	for (const message of value.messages) {
		switch (message.type) {
			case ("text"):
				await text(value, message);
				break;

			case ("sticker"):
				await sticker(value, message);
				break;

			case ("interactive"):
				await interactive(value, message);
				break;

			default:
console.log("type nao suportado:", message.type);
				const wamid = await sendText(message.from, "No momento o meu servidor nao suporta esse tipo de mensagem");
				if (wamid) await saveTextSent(wamid, message.from, "No momento o meu servidor nao suporta esse tipo de mensagem");
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