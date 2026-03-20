import mongodb from "../../../MongoDB/Mongodb.js";
import send from "../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "location"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function location(account, message) {
	try {
		const { stateBot } = await mongodb.Chat.findOne({ idPhone: account.idPhone, phone: message.from }).select("stateBot");

		await mongodb.saveLocationReceived(account.idPhone, message);
		if (stateBot && account.bot.messageNotSupported) await send.text(account, message.from, { text: { body: account.bot.messageNotSupported } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "location": ${error}`);
	}
}