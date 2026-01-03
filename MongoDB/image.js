import { Chat, Message } from "./schema.js";
import saveError from "./error.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR MENSAGENS DE IMAGENS ENVIADAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE QUE RECEBEU A MENSAGEM
 * @param link URL DA IMAGEM ENVIADA
 * @param message MENSAGEM ENVIADA JUNTO COM A IMAGEM
*/
export async function saveImageSent(idPhone, wamid, phone, link, message) {
	try {
		if (!(await Chat.findOne({ idPhone: idPhone, phone: phone }))) {
			await Chat.create({
				idPhone: idPhone,
				phone: phone,
				lastMessage: {
					text: message,
					type: "image",
					image: true
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
							type: "image"
						}
					}
				}
			);
		}
	} catch (error) {
		saveError(idPhone, error);
	}

	try {
		await Message.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "outbound",
			status: "sent",
			type: "image",
			image: {
				link: link,
				caption: message
			}
		});
	} catch (error) {
		saveError(idPhone, error);
	}
}