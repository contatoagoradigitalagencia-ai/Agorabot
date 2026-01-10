import mongodb from "../../../MongoDB/Mongodb.js";

import sockets from "../../../websocket/sockets.js";

import vampeta from "../../../clients/Vampeta/index.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function text(message, account) {
	await mongodb.saveTextReceived(account.idPhone, message.id, message.from, message.text.body, message.timestamp);

// DONO DA CONTA
	await vampeta(account, message);
// DONO DA CONTA

// FRONT END WEBSOCKET
	// const teste = sockets.get(message.from);
	// console.log(teste)
// FRONT END WEBSOCKET
}