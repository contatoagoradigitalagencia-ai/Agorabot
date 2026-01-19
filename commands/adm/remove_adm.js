import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/remove_adm"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function remove_adm(account, message) {
	try {
		const contact = message.text.body.split(" ").slice(1).join(" ");

		if (!contact) {
			await send.text(account, message.from, { text: { body: "Adicione o número de Whatsapp que deseja remover como administrador após o comando `/remove_adm`" } });
			return ;
		}
		await mongodb.removeAdm(account.idPhone, contact);
		await send.text(account, message.from, { text: { body: "Adm removido com sucesso" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "remove_adm": ${error}`);
	}
}