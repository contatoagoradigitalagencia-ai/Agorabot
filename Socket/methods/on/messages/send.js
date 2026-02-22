import mongodb from "../../../../MongoDB/Mongodb.js";
import send from "../../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGEM DO TIPO TEXT PELO FRONT END
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function sendText(socket, data, callback) {
	const { idPhone, phone } = socket.handshake.auth;
	const { text } = data;

	try {
		if (!text || typeof text !== "string") return ;
		await send.text(socket.account, phone, {
			text: {
				body: text
			}
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "sendText": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGEM DO TIPO LOCATION PELO FRONT END
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function sendLocation(socket, data, callback) {
	const { idPhone, phone } = socket.handshake.auth;
	const { latitude, longitude, name, address } = data;

	try {
		if (typeof latitude !== "number" || !Number.isFinite(latitude) || latitude < -90 || latitude > 90) return ;
		if (typeof longitude !== "number" || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) return ;
		if (name !== undefined && typeof name !== "string") return ;
		if (address !== undefined && typeof address !== "string") return ;
		await send.location(socket.account, phone, {
			location: {
				latitude: latitude,
				longitude: longitude,
				name: name,
				address: address
			}
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "sendLocation": ${error}`);
	}
}