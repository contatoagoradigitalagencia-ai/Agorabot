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
	const { dateLastChat } = data || {};

	try {
		if (data !== undefined && data !== null && (typeof data !== "object" || Array.isArray(data))) return (callback({ error: '"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp, _id }' }));
		const query = { idPhone };
		if (dateLastChat !== undefined) {
		if (dateLastChat === null || typeof dateLastChat !== "object" || Array.isArray(dateLastChat)) return (callback({ error: '"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp, _id }' }));
			if (!("timestamp" in dateLastChat) || !("_id" in dateLastChat)) return (callback({ error: '"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp, _id }' }));
			const cursorDate = new Date(dateLastChat.timestamp);
			if (!isNaN(cursorDate.getTime())) {
				query.$or = [
					{
						"lastMessage.timestamp": { $lt: cursorDate }
					},
					{
						"lastMessage.timestamp": cursorDate,
						_id: { $lt: dateLastChat._id }
					}
				];
			}
		}
		const chats = await mongodb.Chat.find(query).sort({ "lastMessage.timestamp": -1, _id: -1 }).limit(15).select("-__v");

		callback({
			chats: chats,
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