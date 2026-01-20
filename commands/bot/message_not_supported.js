import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/mensagem_não_suportada"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function message_not_supported(account, message) {
	try {
		await send.text(account, message.from, { text: { body: (account.bot.messageNotSupported) ? `Seu atual aviso de mensagem não suportado:\n\`${account.bot.messageNotSupported}\`` : "Atualmente seu bot não tem um aviso de mensagem não suportada (seu bot nao responde a mensagens não suportadas)" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "message_not_supported": ${error}`);
	}
}