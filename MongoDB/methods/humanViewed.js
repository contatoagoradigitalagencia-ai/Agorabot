/**
 * @author VAMPETA
 * @brief METODO QUE ATUALIZA O ESTADO DE VISUALIZADO POR UM HUMANO NO BANCO DE DADOS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO DE WHATSAPP QUE ESTA CONVERSANDO COM O BOT
*/
export async function saveHumanView(idPhone, phone) {
	try {
		const res = await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					"lastMessage.humanViewed": true
				}
			}
		);

		return ((res.matchedCount === 1) ? true : false);
		// if (res.matchedCount === 0) return ("NOT_FOUND");
		// if (res.modifiedCount === 0) return ("ALREADY_UPDATED");
		// return ("UPDATED");
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveHumanView": ${error}`);
		return ("ERROR");
	}
}