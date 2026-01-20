import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/add_adm"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function add_adm(account, message) {
	try {
		const contact = message.text.body.split(" ").slice(1).join(" ");

		if (!contact) {
			await send.text(account, message.from, { text: { body: "Adicione o número de Whatsapp que deseje torna administrador após o comando `/adicionar_adm`" } });
			return ;
		}
		await mongodb.saveAdm(account.idPhone, contact);
		await send.text(account, message.from, { text: { body: "Adm adicionado com sucesso" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "add_adm": ${error}`);
	}
}