import { Chat, Message } from "./schema.js";
import saveError from "./error.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR STATUS DE RECEBIDO E VISUALIZADO NO MONGODB
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE VAI MUDAR O STATUS
 * @param status STATUS DA MENSAGEM
*/
export async function saveStatusMessage(idPhone, wamid, phone, status) {
	try {
		await Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					"lastMessage.status": status
				}
			}
		);
	} catch (error) {
		await saveError(idPhone, error);
	}

	try {
		await Message.updateOne(
			{
				wamid: wamid
			},
			{
				$set: {
					status: status
				}
			}
		);
	} catch (error) {
		await saveError(idPhone, error);
	}
}