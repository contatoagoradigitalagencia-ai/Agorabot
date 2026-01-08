// import responseMessage from "../../../../send_message/response-message.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "interactive"
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function interactive(value, message) {
	// responseMessage(message.id, message.from, `Opção selecionada: ${message.interactive[message.interactive.type].title}`);
	console.log("chegou mensagem interativa");
}