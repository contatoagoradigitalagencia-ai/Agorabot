import { ObjectId } from "mongodb";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS RAPIDAS NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} id ID DA MENSAGEM
 * @param {String} name NOME DA MENSAGEM
 * @param {Object} message INFORMACOES DA MENSAGEM QUE SERA SALVA
*/
export async function saveQuickMessage(idPhone, id, name, message) {
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
		await this.saveError(idPhone, `Error no metodo "saveQuickMessage": ${error}`);
		return ("");
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA DELETAR MENSAGENS RAPIDAS NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} id ID DA MENSAGEM
*/
export async function deleteQuickMessage(idPhone, id) {
	try {
		await this.QuickMessage.deleteOne({ idPhone: idPhone, _id: new ObjectId(id) });
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "deletQuickMessage": ${error}`);
	}
}