/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR NOVOS CONTATOS QUE ENTRAM EM CONTATO COM O NUMERO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NOVO CONTATO QUE MANDOU MENSAGEM
 * @param {String} name NOME DO NOVO CONTATO (SE DISPONIVEL)
 * @param {Array<Object>} contacts ARRAY COM INFORMACOES DOS USUARIOS QUE INTERAGIRAM COM O BOT (O NOME DO CONTATO A SER SALVO DEVE SER PROCURADO NESSE ARRAY)
*/
export async function saveContact(idPhone, phone, contacts = []) {
	try {
		const contact = contacts.find((contact) => (contact.wa_id === phone));

		const res = await this.Contact.findOneAndUpdate(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$setOnInsert: {
					idPhone: idPhone,
					phone: phone,
					name: contact?.profile?.name || "Sem nome"
				},
				$set: {
					lastMessage: new Date()
				}
			},
			{ upsert: true, new: true, rawResult: true }
		);
		if (res.lastErrorObject?.upserted) await this.saveMetricNewContact(idPhone);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveContact": ${error}`);
	}
}