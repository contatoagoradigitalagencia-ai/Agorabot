import mongoose from "mongoose";

import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO ENVIAR AS MENSAGENS DE ACORDO COM O RANGE MENCIONADO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function loadMessages(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone, beforeId } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ error: "O payload deve ser um objeto" }));
		if (!phone || typeof phone !== "string") return (callback({ error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		if (beforeId !== undefined && !mongoose.Types.ObjectId.isValid(beforeId)) return (callback({ error: 'O campo "beforeId" é opcional, mas quando informado deve ser uma string ObjectId do MongoDB válido' }));
		const query = { idPhone: idPhone, phone: phone };
		if (beforeId) query._id = { $lt: beforeId };
		const messages = await mongodb.Message.find(query).sort({ _id: -1 }).limit(15).select("-__v").lean();
		const ordered = messages.reverse();

		callback({
			messages: ordered,
			hasMore: messages.length === 15,
			nextCursor: (ordered.length) ? ordered[0]._id : null
		});
		await mongodb.saveHumanView(idPhone, phone);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "loadMessages": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}