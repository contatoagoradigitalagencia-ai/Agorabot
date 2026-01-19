/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O PROMPT QUE VAI SER USADO PARA INSTRUIR A IA DO BOT
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} prompt NOVO PROMPT QUE SERA SALVO
*/
export async function savePrompt(idPhone, prompt) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.prompt": prompt
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "savePrompt": ${error}`);
	}
}