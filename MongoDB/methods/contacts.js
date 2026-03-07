import socket from "../../Socket/Socket.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE CONTATOS NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} wamid ID DA MENSAGEM ENVIADA
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @param {String} data CAMPO data ENVIADO NA REQUISICAO (NAO CONTEM OS CAMPOS "messaging_product" E "to")
*/
export async function saveContactsSent(idPhone, wamid, phone, data) {
	const fullContext = (data.context) ? await this.Message.findOne({ wamid: data.context.message_id }).select("-_id -__v") : undefined;
	const message = {
		idPhone: idPhone,
		phone: phone,
		wamid: wamid,
		direction: "outbound",
		status: "sending",
		context: fullContext,
		data: data
	};

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
		await this.Message.create(message);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveContactsSent": ${error}`);
	}
	try {
		await socket.emit.chat.newMessage(idPhone, phone, message);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveContactsSent": ${error}`);
	}
}