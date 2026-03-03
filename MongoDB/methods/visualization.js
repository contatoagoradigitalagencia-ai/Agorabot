import socket from "../../Socket/Socket.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR STATUS DE RECEBIDO E VISUALIZADO NO MONGODB
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE VAI MUDAR O STATUS
 * @param status STATUS DA MENSAGEM
*/
export async function saveVisualization(idPhone, wamid, phone, status) {
	try {
		await this.Chat.updateOne(
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
		await this.saveError(idPhone, `Error no metodo "saveVisualization": ${error}`);
	}
	try {
		await this.Message.updateOne(
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
		await this.saveError(idPhone, `Error no metodo "saveVisualization": ${error}`);
	}
	try {
		await socket.emit.chat.updateView(idPhone, phone, wamid, status);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveVisualization": ${error}`);
	}
}