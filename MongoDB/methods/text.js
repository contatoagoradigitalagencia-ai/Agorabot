import socket from "../../Socket/Socket.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE TEXTO NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function saveTextReceived(idPhone, message) {
	const { id, from, timestamp, ...data } = message;

	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: from
			},
			{
				$set: {
					lastMessage: {
						text: data.text.body,
						type: "text",
						timestamp: new Date(Number(timestamp) * 1000)
					}
				},
				$setOnInsert: {
					idPhone: idPhone,
					phone: from
				}
			},
			{ upsert: true }
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextReceived": ${error}`);
	}
	try {
		await this.Message.updateOne(
			{
				wamid: id
			},
			{
				$set: {
					timestamp: new Date(Number(timestamp) * 1000),
					data: data
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextReceived": ${error}`);
	}
	try {
		await socket.emit.newMessage(idPhone, from, {
			idPhone: idPhone,
			phone: from,
			wamid: id,
			direction: "inbound",
			status: "sending",
			timestamp: new Date(Number(timestamp) * 1000),
			data: data
		});
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextReceived": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE TEXTO ENVIADAS NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} wamid ID DA MENSAGEM ENVIADA
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @param {String} data CAMPO data ENVIADO NA REQUISICAO (NAO CONTEM OS CAMPOS "messaging_product" E "to")
*/
export async function saveTextSent(idPhone, wamid, phone, data) {
	const message = {
		idPhone: idPhone,
		phone: phone,
		wamid: wamid,
		direction: "outbound",
		status: "sending",
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
						text: data.text.body,
						type: "text",
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
		await this.saveError(idPhone, `Error no metodo "saveTextSent": ${error}`);
	}
	try {
		await this.Message.create(message);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextSent": ${error}`);
	}
	try {
		await socket.emit.newMessage(idPhone, phone, message);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveTextSent": ${error}`);
	}
}