import socket from "../../Socket/Socket.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE LOCALIZACAO NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function saveLocationReceived(idPhone, message) {
	const { id, from, timestamp, context, ...data } = message;
	const fullContext = (context) ? await this.Message.findOne({ wamid: context.id }).select("-_id -__v") : undefined;

	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: from
			},
			{
				$set: {
					lastMessage: {
						text: data.location.name,
						type: "location",
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
		await this.saveError(idPhone, `Error no metodo "saveLocationReceived": ${error}`);
	}
	try {
		await this.Message.updateOne(
			{
				wamid: id
			},
			{
				$set: {
					timestamp: new Date(Number(timestamp) * 1000),
					context: fullContext,
					data: data
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveLocationReceived": ${error}`);
	}
	try {
		await socket.emit.chat.newMessage(idPhone, {
			idPhone: idPhone,
			phone: from,
			wamid: id,
			direction: "inbound",
			timestamp: new Date(Number(timestamp) * 1000),
			context: fullContext,
			data: data
		});
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveLocationReceived": ${error}`);
	}
	try {
		await this.saveMetricMessage(idPhone, "received", "location");
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveLocationReceived": ${error}`);
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
export async function saveLocationSent(idPhone, wamid, phone, data) {
	const fullContext = (data.context) ? await this.Message.findOne({ wamid: data.context.message_id }).select("-_id -__v") : undefined;
	const message = {
		idPhone: idPhone,
		phone: phone,
		wamid: wamid,
		direction: "outbound",
		status: "sending",
		timestamp: (new Date()).toISOString().replace("Z", "+00:00"),
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
						text: data.location.name,
						type: "location",
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
		await this.saveError(idPhone, `Error no metodo "saveLocationSent": ${error}`);
	}
	try {
		await this.Message.create(message);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveLocationSent": ${error}`);
	}
	try {
		await socket.emit.chat.newMessage(idPhone, message);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveLocationSent": ${error}`);
	}
	try {
		await this.saveMetricMessage(idPhone, "sent", "location");
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveLocationSent": ${error}`);
	}
}