// import mongodb from "../../../../MongoDB/Mongodb.js";

// /**
//  * @author VAMPETA
//  * @brief METODO CRIADO ENVIAR OS CHATS DE ACORDO COM O RANGE MENCIONADO
//  * @param {Object} socket OBJETO SOCKET DO CLIENTE
//  * @param {Object} data DADOS ENVIADO PELO CLIENTE
//  * @param {Object} callback FUNCAO DE RESPOSTA
// */
// export async function loadChats(socket, data, callback) {
// 	const { idPhone } = socket.account;

// 	try {
// 		const chats = await mongodb.Chat.find({ idPhone: idPhone }).sort({ "lastMessage.timestamp": -1 }).lean().select("-_id");

// setTimeout(() => {
// 		callback(chats);
// }, 1000);
// 	} catch (error) {
// 		await mongodb.saveError(idPhone, `Error no metodo "botOnOff": ${error}`);
// 	}
// }






import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO ENVIAR OS CHATS DE ACORDO COM O RANGE MENCIONADO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
// export async function loadChats(socket, data, callback) {
// 	const { idPhone } = socket.account;
// 	const { dateLastChat } = data;

// 	try {
// 		const query = { idPhone: idPhone };
// 		if (dateLastChat) query["lastMessage.timestamp"] = { $lt: Number(dateLastChat) };
// 		if (dateLastChat) {
// 			const cursorDate = new Date(dateLastChat);
// console.log(cursorDate)
// 			if (!isNaN(cursorDate.getTime())) query["lastMessage.timestamp"] = { $lt: cursorDate };
// 		}
// 		const chats = await mongodb.Chat.find(query).sort({ "lastMessage.timestamp": -1 }).limit(15).select("-__v");
// console.log(JSON.stringify(chats, null, 2))
// setTimeout(() => {
// 		callback({
// 			chats: chats,
// 			hasMore: chats.length === 15,
// 			nextCursor: (chats.length) ? chats[chats.length - 1].lastMessage.timestamp : null
// 		});
// }, 1000);
// 	} catch (error) {
// 		await mongodb.saveError(idPhone, `Erro loadChats: ${error}`);
// 	}
// }
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

setTimeout(() => {
		callback({
			chats,
			hasMore: chats.length === 15,
			nextCursor: (chats.length) ? {
				timestamp: chats[chats.length - 1].lastMessage.timestamp,
				_id: chats[chats.length - 1]._id
			} : null
		});
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Erro loadChats: ${error}`);
	}
}