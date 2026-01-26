import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/mensagem_não_suportada"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function message_not_supported(account, message) {
	try {
		await send.text(account, message.from, { text: { body: (account.bot.messageNotSupported) ? `Seu atual aviso de mensagem não suportado:\n\`${account.bot.messageNotSupported}\`` : "Atualmente seu bot não tem um aviso de mensagem não suportada (seu bot nao responde a mensagens não suportadas)" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "message_not_supported": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/nova_mensagem_não_suportada"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function new_message_not_supported(account, message) {
	try {
		const messageNotSupported = message.text.body.split(" ").slice(1).join(" ");

		if (!messageNotSupported) {
			await send.text(account, message.from, { text: { body: "Adicione um texto de aviso de mensagem não suportada após o comando `/nova_mensagem_não_suportada`" } });
			return ;
		}
		await mongodb.saveMessageNotSupported(account.idPhone, messageNotSupported);
		await send.text(account, message.from, { text: { body: "Aviso alterado com sucesso" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "new_message_not_supported": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/remover_mensagem_não_suportada"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function remove_message_not_supported(account, message) {
	try {
		await mongodb.saveMessageNotSupported(account.idPhone, "");
		await send.text(account, message.from, { text: { body: "Aviso de mensagem não suportada removida com sucesso (seu bot não vai mais responder a mensagens não suportadas)" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "remove_message_not_supported": ${error}`);
	}
}