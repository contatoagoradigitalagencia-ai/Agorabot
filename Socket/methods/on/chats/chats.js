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

	try {
		const chats = await mongodb.Chat.find({ idPhone: idPhone }).sort({ "lastMessage.timestamp": -1 }).lean().select("-_id");

setTimeout(() => {
		callback(chats);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "botOnOff": ${error}`);
	}
}






// import mongodb from "../../../../MongoDB/Mongodb.js";

// export async function loadChats(socket, data, callback) {
// 	const { idPhone } = socket.account;
// 	const { before } = data; // cursor (timestamp ou _id)

// 	try {
// 		const query = { idPhone };

// 		if (before) {
// 			query["lastMessage.timestamp"] = { $lt: before };
// 		}

// 		const chats = await mongodb.Chat
// 			.find(query)
// 			.sort({ "lastMessage.timestamp": -1 })
// 			.limit(15)
// 			.select("-__v");

// 		const ordered = chats; // já vem ordenado DESC (mais recente primeiro)

// 		callback({
// 			chats: ordered,
// 			hasMore: chats.length === 15,
// 			nextCursor: ordered.length
// 				? ordered[ordered.length - 1].lastMessage.timestamp
// 				: null
// 		});

// 	} catch (error) {
// 		await mongodb.saveError(idPhone, `Erro loadChats: ${error}`);
// 	}
// }