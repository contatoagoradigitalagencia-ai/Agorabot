import sendText from "../../../../send_message/send-text.js";
import sendImage from "../../../../send_message/send-image.js";
import { saveTextReceived } from "../../../../MongoDB/text.js";

import sockets from "../../../../websocket/sockets.js";
// import Groq from "groq-sdk";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function text(message, account) {
	await saveTextReceived(account.idPhone, message.id, message.from, message.text.body, new Date(Number(message.timestamp) * 1000).toISOString());

	// ATIVACAO DE MICROSSERVICOS COMO CHATBOT			// COMECAR A TRABALHAR NISSO?

	// await sendText(message.from, "Mensagem recebida com sucesso!", account);
	// await sendImage(message.from, "https://i1.sndcdn.com/artworks-qAOgl3ivzZzIw0dz-3mVPvA-t1080x1080.jpg", "Satoru Gojo", account);

	// const teste = sockets.get(message.from);
	// console.log(teste)
}