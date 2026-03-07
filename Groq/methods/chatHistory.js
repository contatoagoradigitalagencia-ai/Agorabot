import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief MONTA UM ARRAY DE OBJETOS COM O HISTORICO DE MENSAGENS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @return {Array<Object>} RETORNA UMA STRING COM AS INFORMACOES DAS PAGINAS
*/
export async function chatHistory(account, message) {
	try {
		const history = await mongodb.Message.find({ idPhone: account.idPhone, phone: message.from, "data.type": "text" }).sort({ _id: -1 }).limit(account.bot.historySize);

		return (history.map((message) => ({ role: (message.direction === "inbound") ? "user" : "assistant", content: message.data.text.body })).reverse());
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "chatHistory": ${error}`);
		return ([]);
	}
}