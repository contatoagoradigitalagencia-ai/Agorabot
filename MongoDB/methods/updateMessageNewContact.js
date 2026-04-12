/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR A MENSAGEM PARA NOVOS CONTATOS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} messageNewContact AVISO DE MENSAGEM NAO SUPORTADA
*/
export async function saveMessageNewContact(idPhone, messageNewContact) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.messageNewContact": messageNewContact
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveMessageNewContact": ${error}`);
	}
}