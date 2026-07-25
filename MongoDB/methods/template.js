import socket from "../../Socket/Socket.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR TEMPLATES ENVIADOS NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} wamid ID DA MENSAGEM ENVIADA
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @param {String} data CAMPO data ENVIADO NA REQUISICAO (NAO CONTEM OS CAMPOS "messaging_product" E "to")
*/
export async function saveTemplateSent(idPhone, wamid, phone, data) {
	const message = {
		idPhone: idPhone,
		phone: phone,
		wamid: wamid,
		direction: "outbound",
		status: "sending",
		timestamp: (new Date()).toISOString().replace("Z", "+00:00"),
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
						text: `Template: ${data.template.name}`,
						type: "template",
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
		await this.saveError(idPhone, `Error no metodo "saveTemplateSent": ${error}`);
	}
	try {
		await this.Message.create(message);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTemplateSent": ${error}`);
	}
	try {
		await socket.emit.chat.newMessage(idPhone, message);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTemplateSent": ${error}`);
	}
	try {
		await this.saveMetricMessage(idPhone, "sent", "template");
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTemplateSent": ${error}`);
	}
}
