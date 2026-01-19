import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/adm"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function adm(account, message) {
	try {
		let contacts = "";

		account.adm.forEach((contact) => contacts += "\n" + contact);
		await send.text(account, message.from, { text: { body: "Atuais adms:" + contacts } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "adm": ${error}`);
	}
}