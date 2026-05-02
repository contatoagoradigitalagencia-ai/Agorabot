import mongodb from "../../../../MongoDB/Mongodb.js";
import send from "../../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief VERIFICA SE A MENSAGEM ESTA EM CONFORMIDADE COM OS REQUISITOS
 * @param {String} phone NUMERO DE TELEFONE QUE VAI RECEBER MENSAGEM
 * @param {Object} message MENSAGEM A SER VALIDADA
*/
function validateMessage(phone, message) {
	try {
		if (!phone || typeof phone !== "string") return ('O campo "phone" deve ser do tipo string e não deve estar vazio');
		if (!message || typeof message !== "object") return ('O campo "message" deve ser do tipo object e não deve estar vazio');
		if (typeof message.type !== "string") return ('O campo "message.type" deve ser do tipo string e não deve estar vazio');
		if (!message[message.type]) return (`o campo "${message.type}" não deve estar vazio`);
		switch (message.type) {
			case "text":
				if (!message.text.body || typeof message.text.body !== "string") return ('O campo "message.text.body" deve ser do tipo string e não deve estar vazio');
				break;
			case "audio":
				if (!message.audio.link || typeof message.audio.link !== "string") return ('O campo "message.audio.link" deve ser do tipo string e não deve estar vazio');
				if (typeof message.audio.voice !== "boolean") return ('O campo "message.audio.voice" deve ser do tipo boolean');
				break;
			case "image":
				if (!message.image.link || typeof message.image.link !== "string") return ('O campo "message.image.link" deve ser do tipo string e não deve estar vazio');
				if (typeof message.image.caption !== "string") return ('O campo "message.image.caption" deve ser do tipo string');
				break;
			case "video":
				if (!message.video.link || typeof message.video.link !== "string") return ('O campo "message.video.link" deve ser do tipo string e não deve estar vazio');
				if (typeof message.video.caption !== "string") return ('O campo "message.video.caption" deve ser do tipo string');
				break;
			case "location":
				if (typeof message.location.name !== "string") return ('O campo "message.location.name" deve ser do tipo string');
				if (typeof message.location.address !== "string") return ('O campo "message.location.address" deve ser do tipo string');
				if (typeof message.location.latitude !== "number" || !Number.isFinite(message.location.latitude) || message.location.latitude < -90 || message.location.latitude > 90) return ('Campo "message.location.latitude" inválido');
				if (typeof message.location.longitude !== "number" || !Number.isFinite(message.location.longitude) || message.location.longitude < -180 || message.location.longitude > 180) return ('Campo "message.location.longitude" inválido');
				break;
			case "document":
				if (!message.document.link || typeof message.document.link !== "string") return ('O campo "message.document.link" deve ser do tipo string e não deve estar vazio');
				if (!message.document.filename || typeof message.document.filename !== "string") return ('O campo "message.document.filename" deve ser do tipo string e não deve estar vazio');
				if (typeof message.document.caption !== "string") return ('O campo "message.document.caption" deve ser do tipo string');
				break;
			default:
				return (`Mensagem do tipo ${message.type} não existente`);
		}
		return (null);
	} catch (error) {
		return (error);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGEM DE TODOS OS TIPOS PELO FRONT END
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function sendMessage(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone, message } = data;

	try {
		const error = validateMessage(phone, message);

		if (error) return (callback({ error: error }));
		let wamid = null;
		switch (message.type) {
			case "text":
				wamid = await send.text(socket.account, phone, message);
				break;
			case "audio":
				wamid = await send.audio(socket.account, phone, message);
				break;
			case "image":
				wamid = await send.image(socket.account, phone, message);
				break;
			case "video":
				wamid = await send.video(socket.account, phone, message);
				break;
			case "location":
				wamid = await send.location(socket.account, phone, message);
				break;
			case "document":
				wamid = await send.document(socket.account, phone, message);
				break;
		}
		if (!wamid) return (callback({ error: "Erro interno" }));
		callback(204);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "sendText": ${error}`);
	}
}