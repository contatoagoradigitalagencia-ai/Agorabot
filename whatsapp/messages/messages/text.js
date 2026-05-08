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
		await mongodb.saveTextReceived(account.idPhone, message);
		const { bot } = await mongodb.Contact.findOne({ idPhone: account.idPhone, phone: message.from }).select("-_id bot").lean();
		if (message.text.body[0] === "/" && account.adm.includes(message.from)) {
			await commandsAdm(account, message);
		} else if (account.bot.activated === true && bot === true) {
			await IA.groq["llama-3.3-70b-versatile"].bot(account, message.from);
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "text": ${error}`);
	}
}