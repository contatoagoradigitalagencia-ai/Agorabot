import Chat from "./schemas/chats.js";
import Messages from "./schemas/messages.js";
import saveError from "./error.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR MENSAGENS DE TEXTO RECEBIDAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE RECEBEU A MENSAGEM
 * @param message MENSAGEM ENVIADA
*/
export async function saveTextReceived(idPhone, wamid, phone, message, timestamp) {
	try {
		if (!(await Chat.findOne({ idPhone: idPhone, phone: phone }))) {
			await Chat.create({
				idPhone: idPhone,
				phone: phone,
				lastMessage: {
					text: message,
					type: "text",
					timestamp: timestamp
				}
			});
		} else {
			await Chat.updateOne(
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
		await saveError(idPhone, error);
	}
	try {
		await Messages.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "inbound",
			type: "text",
			text: message
		});
	} catch (error) {
		await saveError(idPhone, error);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR MENSAGENS DE TEXTO ENVIADAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param message MENSAGEM QUE SERA ENVIADA
*/
export async function saveTextSent(idPhone, wamid, phone, message) {
	try {
		if (!(await Chat.findOne({ idPhone: idPhone, phone: phone }))) {
			await Chat.create({
				idPhone: idPhone,
				phone: phone,
				lastMessage: {
					text: message,
					type: "text",
					status: "sending"
				}
			});
		} else {
			await Chat.updateOne(
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
		await saveError(idPhone, error);
	}
	try {
		await Messages.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "outbound",
			status: "sent",
			type: "text",
			text: message
		});
	} catch (error) {
		await saveError(idPhone, error);
	}
}