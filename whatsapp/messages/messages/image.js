import mongodb from "../../../MongoDB/Mongodb.js";
import send from "../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "image"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function image(account, message) {
	try {
		const { stateBot } = await mongodb.Chat.findOne({ idPhone: account.idPhone, phone: message.from }).select("stateBot");

		// if (stateBot) {
		// 	await mongodb.saveTextReceived(account.idPhone, { id: message.id, from: message.from, timestamp: message.timestamp, type: "text", text: { body: `Mensagem não suportada: ${message.type}` } });
		// 	if (account.bot.messageNotSupported) await send.text(account, message.from, { text: { body: account.bot.messageNotSupported } });
		// } else {
		// 	await mongodb.saveImageReceived(account.idPhone, message);
		// }

		await mongodb.saveImageReceived(account.idPhone, account.accessToken, message);
		if (stateBot && account.bot.messageNotSupported) await send.text(account, message.from, { text: { body: account.bot.messageNotSupported } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "image": ${error}`);
	}
}