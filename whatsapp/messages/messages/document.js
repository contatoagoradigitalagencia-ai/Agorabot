import mongodb from "../../../MongoDB/Mongodb.js";
import cloudflareR2 from "../../../Cloudflare R2/CloudflareR2.js";
import send from "../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "document"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function document(account, message) {
	try {
		const { stateBot } = await mongodb.Chat.findOne({ idPhone: account.idPhone, phone: message.from }).select("stateBot");

		message.document.url = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, message.document.url, "document");
		await mongodb.saveDocumentReceived(account.idPhone, message);
		if (stateBot && account.bot.messageNotSupported) await send.text(account, message.from, { text: { body: account.bot.messageNotSupported } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "document": ${error}`);
	}
}