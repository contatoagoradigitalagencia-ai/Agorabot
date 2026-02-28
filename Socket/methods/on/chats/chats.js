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
		const chats = await mongodb.Chat.find({ idPhone: idPhone }).select("-_id");

setTimeout(() => {
		callback(chats);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "botOnOff": ${error}`);
	}
}