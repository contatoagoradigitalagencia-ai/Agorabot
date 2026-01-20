import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/remover_mensagem_não_suportada"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function remove_message_not_supported(account, message) {
	try {
		await mongodb.saveMessageNotSupported(account.idPhone, "");
		await send.text(account, message.from, { text: { body: "Aviso de mensagem não suportada removida com sucesso (seu bot não vai mais responder a mensagens não suportadas)" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "remove_message_not_supported": ${error}`);
	}
}