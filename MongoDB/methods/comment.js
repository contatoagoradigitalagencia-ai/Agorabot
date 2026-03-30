/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O COMENTARIO DO CONTATO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} contact NUMERO DE CONTATO
 * @param {String} text COMENTARIO QUE SERA SALVO
*/
export async function saveComment(idPhone, contact, text) {
	try {
		return (await this.Contact.updateOne(
			{
				idPhone: idPhone,
				phone: contact
			},
			{
				comment: text
			}
		));
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveComment": ${error}`);
		return ({});
	}
}