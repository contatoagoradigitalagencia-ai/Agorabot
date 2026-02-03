// import googleSheets from "../../../Google Sheets/GoogleSheets.js";
// import send from "../../../Send/Send.js";
import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "interactive"
 * @param {Object} io INSTANCIA PRINCIPAL DO Socket.IO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function interactive(io, account, message) {
	try {
		if (message.interactive.type === "list_reply") {
console.log("chegou resposta de lista")
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "interactive": ${error}`);
	}
}