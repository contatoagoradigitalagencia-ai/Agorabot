import mongodb from "../../../MongoDB/Mongodb.js";

// import sockets from "../../../websocket/sockets.js";

import commands from "../../../commands/commands.js";
import bot from "../../../bot/bot.js";

// import send from "../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function text(account, message) {
	try {
		await mongodb.saveTextReceived(account.idPhone, message);
		if (message.text.body[0] === "/" && account.adm.includes(message.from)) {
			await commands(account, message);
		} else {
			await bot(account, message);
		}

// FRONT END WEBSOCKET
		// const teste = sockets.get(message.from);
		// console.log(teste)
// FRONT END WEBSOCKET
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "text": ${error}`);
	}
}