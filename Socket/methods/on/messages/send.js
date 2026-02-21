import mongodb from "../../../../MongoDB/Mongodb.js";
import send from "../../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGEM PELO FRONT END
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function sendText(socket, data, callback) {
	const { idPhone, phone } = socket.handshake.auth;
	const { text } = data;

	try {
		await send.text(socket.account, phone, { text: { body: text } });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "send_text": ${error}`);
	}
}