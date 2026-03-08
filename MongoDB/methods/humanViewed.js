/**
 * @author VAMPETA
 * @brief 
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO DE WHATSAPP QUE ESTA CONVERSANDO COM O BOT
*/
export async function saveHumanView(idPhone, phone) {
	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					lastMessage: {
						humanViewed: true
					}
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveHumanView": ${error}`);
	}
}