// import googleSheets from "../../../Google Sheets/GoogleSheets.js";
// import send from "../../../Send/Send.js";

import { vampetaInteractive } from "../../../clients/Vampeta/index.js";
// import { ramonInteractive } from "../../../clients/Ramon/index.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "interactive"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function interactive(account, message) {
	try {
// DONO DA CONTA
		// await vampetaInteractive(account, message);
		// await ramonInteractive(account, message);	// SO PRO RAMON VER
// DONO DA CONTA


		if (message.interactive.type === "list_reply") {
console.log("chegou resposta de lista")
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "interactive": ${error}`);
	}
}