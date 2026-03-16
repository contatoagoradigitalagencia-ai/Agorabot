import socket from "../../Socket/Socket.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE AUDIOS NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function saveAudioReceived(idPhone, message) {
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
						text: "Áudio",
						type: "audio",
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
		await this.saveError(idPhone, `Error no metodo "saveAudioReceived": ${error}`);
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
		await this.saveError(idPhone, `Error no metodo "saveAudioReceived": ${error}`);
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
		await this.saveError(idPhone, `Error no metodo "saveAudioReceived": ${error}`);
	}
}