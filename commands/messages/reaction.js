import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/reaction" (TESTA A MENSAGEM DO TIPO "reaction")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function reaction(account, message) {
	try {
		await send.reaction(account, message.from, { reaction: { message_id: message.id, emoji: "😀" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "reaction": ${error}`);
	}
}