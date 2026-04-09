import mongodb from "../../../MongoDB/Mongodb.js";
import IA from "../../../IA/IA.js";
import commandsAdm from "../../../commands/adm/commands.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function text(account, message) {
	try {
		const { stateBot } = await mongodb.Chat.findOne({ idPhone: account.idPhone, phone: message.from }).select("stateBot");

		await mongodb.saveTextReceived(account.idPhone, message);
		if (message.text.body[0] === "/" && account.adm.includes(message.from)) {
			await commandsAdm(account, message);
		} else if (account.bot.activated === true && stateBot === true) {
			await IA.groq.bot(account, message);
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "text": ${error}`);
	}
}