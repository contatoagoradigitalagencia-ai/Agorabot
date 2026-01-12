import mongodb from "../../../MongoDB/Mongodb.js";

import sockets from "../../../websocket/sockets.js";

import { vampetaText } from "../../../clients/Vampeta/index.js";
// import { ramonText } from "../../../clients/Ramon/index.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function text(account, message) {
	try {
		await mongodb.saveTextReceived(account.idPhone, message.id, message.from, message.text.body, message.timestamp);

// DONO DA CONTA
		await vampetaText(account, message);
		// await ramon(account, message);	// SO PRO RAMON VER
// DONO DA CONTA

// FRONT END WEBSOCKET
		// const teste = sockets.get(message.from);
		// console.log(teste)
// FRONT END WEBSOCKET
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "text": ${error}`);
	}
}