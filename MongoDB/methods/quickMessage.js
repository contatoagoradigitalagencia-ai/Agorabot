/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS RAPIDAS DE TEXTO NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Object} message INFORMACOES DA MENSAGEM QUE SERA SALVA
*/
export async function saveQuickMessageText(idPhone, id, name, message) {
	try {
		if (id) {
			await this.QuickMessage.updateOne(
				{
					idPhone: idPhone,
					_id: id
				},
				{
					$set: {
						name: name,
						message: message
					}
				}
			);
			return (id);
		} else {
			const res = await this.QuickMessage.create({
				idPhone: idPhone,
				name: name,
				message: message
			});

			return (res._id);
		}
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveQuickMessageText": ${error}`);
		return ("");
	}
}
