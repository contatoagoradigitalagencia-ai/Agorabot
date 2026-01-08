/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE TEXTO RECEBIDAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE RECEBEU A MENSAGEM
 * @param message MENSAGEM ENVIADA
*/
export async function saveTextReceived(idPhone, wamid, phone, message, timestamp) {
	try {
		if (!(await this.Chat.findOne({ idPhone: idPhone, phone: phone }))) {
			await this.Chat.create({
				idPhone: idPhone,
				phone: phone,
				lastMessage: {
					text: message,
					type: "text",
					timestamp: timestamp
				}
			});
		} else {
			await this.Chat.updateOne(
				{
					idPhone: idPhone,
					phone: phone
				},
				{
					$set: {
						lastMessage: {
							text: message,
							type: "text",
							timestamp: timestamp
						}
					}
				}
			);
		}
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextReceived": ${error}`);
	}
	try {
		await this.Message.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "inbound",
			type: "text",
			text: message
		});
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextReceived": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE TEXTO ENVIADAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param message MENSAGEM QUE SERA ENVIADA
*/
export async function saveTextSent(idPhone, wamid, phone, message) {
	try {
		if (!(await this.Chat.findOne({ idPhone: idPhone, phone: phone }))) {
			await this.Chat.create({
				idPhone: idPhone,
				phone: phone,
				lastMessage: {
					text: message,
					type: "text",
					status: "sending"
				}
			});
		} else {
			await this.Chat.updateOne(
				{
					idPhone: idPhone,
					phone: phone
				},
				{
					$set: {
						lastMessage: {
							text: message,
							type: "text",
							status: "sent"
						}
					}
				}
			);
		}
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextSent": ${error}`);
	}
	try {
		await this.Message.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "outbound",
			status: "sent",
			type: "text",
			text: message
		});
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextSent": ${error}`);
	}
}