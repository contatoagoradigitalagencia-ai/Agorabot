/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O AVISO DE MENSAGEM NAO SUPORTADA
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} messageNotSupported AVISO DE MENSAGEM NAO SUPORTADA
*/
export async function saveMessageNotSupported(idPhone, messageNotSupported) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.messageNotSupported": messageNotSupported
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveMessageNotSupported": ${error}`);
	}
}