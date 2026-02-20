/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O ESTADO SE O BOT ESTA LIGADO PARA AQUELE CHAT OU NAO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NOVO CONTATO QUE MANDOU MENSAGEM
 * @param {Boolean} stateBot NOVO ESTADO DO BOT SE ELE ESTA LIGADO OU NAO
*/
export async function saveStateBot(idPhone, phone, stateBot) {
	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					stateBot: stateBot
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveStateBot": ${error}`);
	}
}