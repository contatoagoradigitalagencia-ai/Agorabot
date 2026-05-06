import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief MONTA UM ARRAY DE OBJETOS COM O HISTORICO DE MENSAGENS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO A SER BUSCADO O HISTORICO
 * @param {Number} numberMessages NUMERO DE MENSAGENS DO HISTORICO
 * @return {Array<Object>} RETORNA UMA STRING COM AS INFORMACOES DAS PAGINAS
*/
export async function chatHistory(account, phone, numberMessages) {
	try {
		const history = await mongodb.Message.find({ idPhone: account.idPhone, phone: phone, "data.type": { $in: ["text", "audio"] } }).sort({ _id: -1 }).limit(numberMessages);

		return (history.map((message) => ({ role: (message.direction === "inbound") ? "user" : "assistant", content: message.data.text?.body || message.data.audio?.transcribe || "" })).reverse());
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "chatHistory": ${error}`);
		return ([]);
	}
}