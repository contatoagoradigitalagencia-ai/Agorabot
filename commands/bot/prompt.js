import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/prompt"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function prompt(account, message) {
	try {
		await send.text(account, message.from, { text: { body: `Seu prompt atual:\n\`${account.bot.prompt}\`` } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "prompt": ${error}`);
	}
}