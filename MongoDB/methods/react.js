/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE TEXTO NO MONGODB
*/
export async function saveReactReceived() {			// PAREI AKI
	try {

	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveReactReceived": ${error}`);
	}
	try {

	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveReactReceived": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE TEXTO ENVIADAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE RECEBEU A MENSAGEM
 * @param emoji EMOJI USADO PARA REAGIR
*/
export async function saveReactSent(idPhone, wamid, phone, emoji) {
	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					lastMessage: {
						text: `Você reagiu com "${emoji}"`,
						type: "react",
						status: "sending"
					}
				},
				$setOnInsert: {
					idPhone: idPhone,
					phone: phone
				}
			},
			{ upsert: true }
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveReactSent": ${error}`);
	}
	try {
		await this.Message.updateOne(
			{
				wamid: wamid
			},
			{
				$set: {
					react: emoji
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveReactSent": ${error}`);
	}
}