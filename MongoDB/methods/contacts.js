/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE CONTATOS NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} wamid ID DA MENSAGEM ENVIADA
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @param {String} data CAMPO data ENVIADO NA REQUISICAO (NAO CONTEM OS CAMPOS "messaging_product" E "to")
*/
export async function saveContactsSent(idPhone, wamid, phone, data) {
	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					lastMessage: {
						text: data.contacts[0].name.formatted_name,
						type: "contacts",
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
		await this.saveError(idPhone, `Error no metodo "saveContactsSent": ${error}`);
	}
	try {
		await this.Message.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "outbound",
			status: "sending",
			data: data
		});
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveContactsSent": ${error}`);
	}
}