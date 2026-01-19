import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/contacts" (TESTA A MENSAGEM DO TIPO "contacts")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function contacts(account, message) {
	try {
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }] } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, emails: [{ email: "email@dominio.com" }, { email: "email@dominio.com" }] } });
		await send.contacts(account, message.from, { context: { message_id: message.id }, contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }] } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }], org: { company: "compania", title: "titulo" } } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }], emails: [{ email: "email@dominio.com" }, { email: "email@dominio.com" }] } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "contacts": ${error}`);
	}
}