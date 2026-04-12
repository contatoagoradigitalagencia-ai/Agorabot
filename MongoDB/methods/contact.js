import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR NOVOS CONTATOS QUE ENTRAM EM CONTATO COM O NUMERO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NOVO CONTATO QUE MANDOU MENSAGEM
 * @param {String} name NOME DO NOVO CONTATO (SE DISPONIVEL)
 * @param {Array<Object>} contacts ARRAY COM INFORMACOES DOS USUARIOS QUE INTERAGIRAM COM O BOT (O NOME DO CONTATO A SER SALVO DEVE SER PROCURADO NESSE ARRAY)
*/
export async function saveContact(account, phone, contacts = []) {
	try {
		const contact = contacts.find((contact) => (contact.wa_id === phone));
		const res = await this.Contact.findOneAndUpdate(
			{
				idPhone: account.idPhone,
				phone: phone
			},
			{
				$setOnInsert: {
					idPhone: account.idPhone,
					phone: phone,
					name: contact?.profile?.name || "Sem nome"
				},
				$set: {
					lastMessage: new Date()
				}
			},
			{ upsert: true, new: true, includeResultMetadata: true }
		);
		return ((!res.lastErrorObject.updatedExisting) ? true : false);
	} catch (error) {
		await this.saveError(account.idPhone, `Error no metodo "saveContact": ${error}`);
	}
}