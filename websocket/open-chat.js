import Chat from "../MongoDB/schemas/chats.js";

/**
 * @author VAMPETA
 * @brief ESPERA A NOTIFICACAO DE ABRIR O CHAT E ATUALIZA O BANCO DE DADOS
 * @param payload PAYLOAD RECEBIDO
 * @param callback FUNCAO DE CALLBACK
*/
export default async function open_chat(payload, callback) {
	const { phone } = payload;

	if (!phone) return ;
	await Chat.updateOne(
		{
			phone: phone
		},
		{
			$set: {
				"lastMessage.humanViewed": true
			}
		}
	);
}