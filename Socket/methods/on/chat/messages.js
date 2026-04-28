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
	const { phone, beforeId } = data;

	try {
		if (!phone || typeof phone !== "string") return ;
		const query = { idPhone: idPhone, phone: phone };
		if (beforeId) query._id = { $lt: beforeId };
		const messages = await mongodb.Message.find(query).sort({ _id: -1 }).limit(15).select("-__v");
		const ordered = messages.reverse();

// setTimeout(() => {			// REMOVENDO DELAY
		callback({
			messages: ordered,
			hasMore: messages.length === 15,
			nextCursor: (ordered.length) ? ordered[0]._id : null
		});
// }, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "loadMessages": ${error}`);
	}
}