import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO ENVIAR OS CHATS DE ACORDO COM O RANGE MENCIONADO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function loadChats(socket, data, callback) {
	const { idPhone } = socket.account;
	const { dateLastChat } = data;

	try {
		const query = { idPhone };
		if (dateLastChat) {
			const { timestamp, _id } = dateLastChat;
			const cursorDate = new Date(timestamp);
			if (!isNaN(cursorDate.getTime())) {
				query.$or = [
					{ "lastMessage.timestamp": { $lt: cursorDate } },
					{
						"lastMessage.timestamp": cursorDate,
						_id: { $lt: _id }
					}
				];
			}
		}
		const chats = await mongodb.Chat.find(query).sort({ "lastMessage.timestamp": -1, _id: -1 }).limit(15).select("-__v");

		callback({
			chats,
			hasMore: chats.length === 15,
			nextCursor: (chats.length) ? {
				timestamp: chats[chats.length - 1].lastMessage.timestamp,
				_id: chats[chats.length - 1]._id
			} : null
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "loadChats": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO QUE ATUALIZA O ESTADO DE VISUALIZADO POR UM HUMANO NO BANCO DE DADOS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateHumanViewed(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone } = data;

	try {
		if (!phone) return ;
		await mongodb.saveHumanView(idPhone, phone);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateHumanViewed": ${error}`);
	}
}