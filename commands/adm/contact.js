import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/contatos" (TESTA A MENSAGEM DO TIPO "contatos")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function contact(account, message) {
	try {
		const contacts = await mongodb.Contact.find({ idPhone: account.idPhone });

		contacts.forEach(async (contact) => {
			const name = (contact.name) ? contact.name : "Sem nome";
			await send.contacts(account, message.from, { contacts: { name: { formatted_name: name, first_name: name }, phones: [{ phone: contact.phone }] } });
		});
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "contatos": ${error}`);
	}
}