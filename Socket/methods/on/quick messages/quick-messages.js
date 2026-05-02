import mongodb from "../../../../MongoDB/Mongodb.js";
import messages from "../../../../MongoDB/schemas/messages.js";
import cloudflareR2 from "../../../../Cloudflare R2/CloudflareR2.js";

/**
 * @author VAMPETA
 * @brief CONSULTA AS MENSAGENS RAPIDAS SALVAS NO BANCO DE DADOS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getQuickMessages(socket, data, callback) {
	const { idPhone } = socket.account;
	const { type } = data;

	try {
		if (type && typeof type !== "string") return (callback({ error: 'O campo "type" deve ser do tipo string' }));
		if (type && !["text", "audio", "image", "video", "location", "document"].includes(type)) return (callback({ error: `Tipo de mensagem "${type}" não existe` }));
		const query = { idPhone: idPhone, ...(type && { "message.type": type }) };
		const messages = await mongodb.QuickMessage.find(query).select("-idPhone").sort({ timestamp: -1 }).lean();
		const res = messages.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

setTimeout(() => {
		callback(res);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getQuickMessages": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief VERIFICA SE OS DADOS ESTAO EM CONFORMIDADE COM A REQUISICAO
 * @param {String} name NOME DA MENSAGEM
 * @param {Object} message INFORMACOES DA MENSAGEM
*/
function validateData(name, message) {
	try {
		if (!name || typeof name !== "string") return ('O campo "name" deve ser do tipo string e não deve estar vazio');
		if (!message || typeof message !== "object") return ('O campo "message" deve ser do tipo object e não deve estar vazio');
		if (typeof message.type !== "string") return ('O campo "message.type" dever se do tipo string e não deve esta vazio');
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
				if (message.image.caption && typeof message.image.caption !== "string") return ('O campo "message.image.caption" deve ser do tipo string');
				break;
			case "video":
				if (!message.video.link || typeof message.video.link !== "string") return ('O campo "message.video.link" deve ser do tipo string e não deve estar vazio');
				if (message.video.caption && typeof message.video.caption !== "string") return ('O campo "message.video.caption" deve ser do tipo string');
				break;
			case "location":
				if (message.location.name && typeof message.location.name !== "string") return ('O campo "message.location.name" deve ser do tipo string');
				if (message.location.address && typeof message.location.address !== "string") return ('O campo "message.location.address" deve ser do tipo string');
				if (!message.location.latitude || typeof message.location.latitude !== "number") return ('O campo "message.location.latitude" deve ser do tipo number e não deve estar vazio');
				if (message.location.latitude < -90 || message.location.latitude > 90) return ("Latitude fora do intervalo (-90 a 90)");
				if (!message.location.longitude || typeof message.location.longitude !== "number") return ('O campo "message.location.longitude" deve ser do tipo number e não deve estar vazio');
				if (message.location.longitude < -180 || message.location.longitude > 180) return ("Longitude fora do intervalo (-180 a 180)");
				break;
			case "document":
				if (!message.document.link || typeof message.document.link !== "string") return ('O campo "message.document.link" deve ser do tipo string e não deve estar vazio');
				if (!message.document.filename || typeof message.document.filename !== "string") return ('O campo "message.document.filename" deve ser do tipo string e não deve estar vazio');
				if (message.document.caption && typeof message.document.caption !== "string") return ('O campo "message.document.caption" deve ser do tipo string');
				break;
			default:
				return (null);
		}
	} catch (error) {
		return (error);
	}
}

/**
 * @author VAMPETA
 * @brief SALVA OU ATUALIZA UMA MENSAGEM RAPIDA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function saveQuickMessage(socket, data, callback) {
	const { idPhone } = socket.account;
	const { id, name, message } = data;

	try {
		const error = validateData(name, message);
		if (error) return (callback({ error: error }));
		const _id = await mongodb.saveQuickMessage(idPhone, id, name, message);

setTimeout(() => {
		callback({ id: _id });
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "saveQuickMessage": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief DELETA UMA MENSAGEM RAPIDA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function deleteQuickMessage(socket, data, callback) {
	const { idPhone } = socket.account;
	const { id } = data;

	try {
		if (!id || typeof id !== "string") return (callback({ error: 'O campo "id" deve ser do tipo string e não deve estar vazio' }));
		const message = await mongodb.QuickMessage.findById(id).lean();
		if (!message) return (callback({ error: "Mensagem não encontrada pelo id" }));
		if (["audio", "image", "video", "document"].includes(message.message?.type)) await cloudflareR2.deleteFile(idPhone, message.message?.[message.message.type]?.link);
		await mongodb.deleteQuickMessage(idPhone, id);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "deleteQuickMessage": ${error}`);
	}
}