import { Chat, Message } from "./schema.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR STATUS DE RECEBIDO E VISUALIZADO NO MONGODB
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE VAI MUDAR O STATUS
 * @param status STATUS DA MENSAGEM
*/
export async function saveStatusSent(wamid, phone, status) {
	try {
		await Chat.updateOne(
			{
				phone: phone,
			},
			{
				$set: {
					"lastMessage.status": status
				}
			}
		);
	} catch (error) {
console.log("status do chat nao atualizado no mongodb (enviado)");
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
console.log("status da mensagem nao atualizado no mongodb (enviado)");
	}
}