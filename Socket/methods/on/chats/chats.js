import mongoose from "mongoose";

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
		if (data !== undefined && data !== null && (typeof data !== "object" || Array.isArray(data))) return (callback({ code: 400, error: '"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }' }));
		const query = { idPhone };
		if (dateLastChat !== undefined) {
			if (dateLastChat === null || typeof dateLastChat !== "object" || Array.isArray(dateLastChat)) return (callback({ code: 400, error: '"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }' }));
			if (!("timestamp" in dateLastChat) || typeof dateLastChat.timestamp !== "string" || !("_id" in dateLastChat) || typeof dateLastChat._id !== "string") return (callback({ code: 400, error: '"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }' }));
			const cursorDate = new Date(dateLastChat.timestamp);
			if (isNaN(new Date(dateLastChat.timestamp))) return (callback({ code: 422, error: '"dateLastChat.timestamp" inválido' }));
			if (!mongoose.Types.ObjectId.isValid(dateLastChat._id)) return (callback({ code: 422, error: '"dateLastChat._id" inválido' }));
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
		const chats = await mongodb.Chat.find(query).sort({ "lastMessage.timestamp": -1, _id: -1 }).limit(15).select("-__v").lean();

		callback({
			code: 200,
			chats: chats,
			hasMore: chats.length === 15,
			nextCursor: (chats.length) ? {
				timestamp: chats[chats.length - 1].lastMessage.timestamp,
				_id: chats[chats.length - 1]._id
			} : null
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "loadChats": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}