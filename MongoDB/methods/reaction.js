import socket from "../../Socket/Socket.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR REACOES RECEBIDAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM REAGIDA
 * @param phone NUMERO QUE RECEBEU A REACAO
 * @param emoji EMOJI USADO PARA REAGIR
 * @param timestamp DATA QUE A MENSAGEM CHEGOU (UNIX TIMESTAMP)
*/
export async function saveReactionReceived(idPhone, wamid, phone, emoji, timestamp) {
	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					lastMessage: {
						text: `Reagiu com "${emoji}"`,
						type: "reaction",
						timestamp: new Date(Number(timestamp) * 1000)
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
		await this.saveError(idPhone, `Error no metodo "saveReactionReceived": ${error}`);
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
		await this.saveError(idPhone, `Error no metodo "saveReactionReceived": ${error}`);
	}
	try {
		await socket.emit.newReact(idPhone, phone, wamid, emoji);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveReactionReceived": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR REACOES ENVIADAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM REAGIDA
 * @param phone NUMERO QUE RECEBEU A REACAO
 * @param emoji EMOJI USADO PARA REAGIR
*/
export async function saveReactionSent(idPhone, wamid, phone, emoji) {
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
						type: "reaction"
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
		await this.saveError(idPhone, `Error no metodo "saveReactionSent": ${error}`);
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
		await this.saveError(idPhone, `Error no metodo "saveReactionSent": ${error}`);
	}
	try {
		await socket.emit.newReact(idPhone, phone, wamid, emoji);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveReactionReceived": ${error}`);
	}
}