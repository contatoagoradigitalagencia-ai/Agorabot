import send from "../../../Send/Send.js";
import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/text" (TESTA A MENSAGEM DO TIPO "text")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function text(account, message) {
	try {
		await send.text(account, message.from, { text: { body: "texto" } });
		await send.text(account, message.from, { context: { message_id: message.id }, text: { body: "texto" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "text": ${error}`);
	}
}