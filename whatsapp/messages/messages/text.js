import mongodb from "../../../MongoDB/Mongodb.js";

// import sockets from "../../../websocket/sockets.js";

// import { vampetaText } from "../../../clients/Vampeta/index.js";
// import { ramonText } from "../../../clients/Ramon/index.js";
import adm from "../../../adm/adm.js";
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
		if (account.adm.includes(message.from) && message.text.body[0] === "/") {		// VERIFICA SE E UM ADM DA CONTA E SE ELE ESTA ENVIANDO UM COMANDO
			// await vampetaText(account, message);
			await adm(account, message);
		} else {																		// O FLUXO CONTINUA CASO NAO SEJA UM ADM OU NAO SEJA UM COMANDO DE ADM
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