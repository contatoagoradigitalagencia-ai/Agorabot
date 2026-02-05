import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO ENVIAR O CHAT COMPLETO AO INICIAR A CONEXAO COM O SOCKET
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function openChat(socket, data, callback) {
	const { idPhone, phone } = socket.handshake.auth;
	try {
		const messages = await mongodb.Message.find({ idPhone: idPhone, phone: phone });

		callback(messages);
// const teste = [messages[0], messages[1], messages[2]];
// callback(teste);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "openChat": ${error}`);
	}
}