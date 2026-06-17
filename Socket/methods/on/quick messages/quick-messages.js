import mongoose from "mongoose";

import mongodb from "../../../../MongoDB/Mongodb.js";
import cloudflareR2 from "../../../../Cloudflare R2/CloudflareR2.js";
import IA from "../../../../IA/IA.js";

/**
 * @author VAMPETA
 * @brief CONSULTA AS MENSAGENS RAPIDAS SALVAS NO BANCO DE DADOS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getQuickMessages(socket, data, callback) {
	const { idPhone } = socket.account;
	const { type } = data || {};

	try {
		if (data !== null && (typeof data !== "object" || Array.isArray(data))) return (callback({ code: 400, error: "O payload deve ser um objeto ou não deve ser enviado" }));
		if (data !== null && typeof data === "object" && (!type || typeof type !== "string")) return (callback({ code: 400, error: 'O campo "type" deve ser do tipo string e não deve estar vazio' }));
		if (type && !["text", "audio", "image", "video", "location", "document"].includes(type)) return (callback({ code: 422, error: `Tipo de mensagem "${type}" não existe` }));
		const query = { idPhone: idPhone, ...(type && { "message.type": type }) };
		const messages = await mongodb.QuickMessage.find(query).select("-idPhone").sort({ timestamp: -1 }).lean();
		const res = messages.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

		callback({ code: 200, messages: res });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getQuickMessages": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
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
		if (!name || typeof name !== "string") return ({ code: 400, error: 'O campo "name" deve ser do tipo string e não deve estar vazio' });
		if (!message || typeof message !== "object" || Array.isArray(message)) return ({ code: 400, error: 'O campo "message" deve ser do tipo object e não deve estar vazio' });
		if (!message.type || typeof message.type !== "string" || Array.isArray(message)) return ({ code: 400, error: 'O campo "message.type" deve ser do tipo string e não deve estar vazio' });
		if (!message[message.type] || typeof message[message.type] !== "object" || Array.isArray(message[message.type])) return ({ code: 400, error: `O campo "message.${message.type}" deve conter um objeto válido` });
		switch (message.type) {
			case "text":
				if (!message.text.body || typeof message.text.body !== "string") return ({ code: 400, error: 'O campo "message.text.body" deve ser do tipo string e não deve estar vazio' });
				break;
			case "audio":
				if (!message.audio.link || typeof message.audio.link !== "string") return ({ code: 400, error: 'O campo "message.audio.link" deve ser do tipo string e não deve estar vazio' });
				if (typeof message.audio.voice !== "boolean") return ({ code: 400, error: 'O campo "message.audio.voice" deve ser do tipo boolean' });
				break;
			case "image":
				if (!message.image.link || typeof message.image.link !== "string") return ({ code: 400, error: 'O campo "message.image.link" deve ser do tipo string e não deve estar vazio' });
				if (typeof message.image.caption !== "string") return ({ code: 400, error: 'O campo "message.image.caption" deve ser do tipo string' });
				break;
			case "video":
				if (!message.video.link || typeof message.video.link !== "string") return ({ code: 400, error: 'O campo "message.video.link" deve ser do tipo string e não deve estar vazio' });
				if (typeof message.video.caption !== "string") return ({ code: 400, error: 'O campo "message.video.caption" deve ser do tipo string' });
				break;
			case "location":
				if (typeof message.location.latitude !== "number" || Number.isNaN(message.location.latitude)) return ({ code: 400, error: 'O campo "message.location.latitude" deve ser do tipo number' });
				if (message.location.latitude < -90 || message.location.latitude > 90) return ({ code: 422, error: 'Campo "message.location.latitude" inválido' });
				if (typeof message.location.longitude !== "number" || Number.isNaN(message.location.longitude)) return ({ code: 400, error: 'O campo "message.location.longitude" deve ser do tipo number' });
				if (message.location.longitude < -180 || message.location.longitude > 180) return ({ code: 422, error: 'Campo "message.location.longitude" inválido' });
				if (typeof message.location.name !== "string") return ({ code: 400, error: 'O campo "message.location.name" deve ser do tipo string' });
				if (typeof message.location.address !== "string") return ({ code: 400, error: 'O campo "message.location.address" deve ser do tipo string' });
				break;
			case "document":
				if (!message.document.link || typeof message.document.link !== "string") return ({ code: 400, error: 'O campo "message.document.link" deve ser do tipo string e não deve estar vazio' });
				if (!message.document.filename || typeof message.document.filename !== "string") return ({ code: 400, error: 'O campo "message.document.filename" deve ser do tipo string e não deve estar vazio' });
				if (typeof message.document.caption !== "string") return ({ code: 400, error: 'O campo "message.document.caption" deve ser do tipo string' });
				break;
			default:
				return ({ code: 404, error: `Mensagem do tipo ${message.type} não existente` });
		}
		return (null);
	} catch (error) {
		return ({ code: 500, error: "Erro interno do servidor" });
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
	const { id, name, message } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		const error = validateData(name, message);

		if (error) return (callback(error));
		if (message.type === "audio") message.audio.transcribe = await IA.groq["whisper-large-v3-turbo"].transcribeFileCloudflare(idPhone, message.audio.link);
		const _id = await mongodb.saveQuickMessage(idPhone, id, name, message);

		callback({ code: 200, id: _id });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "saveQuickMessage": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
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
	const { id } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!id || typeof id !== "string") return (callback({ code: 400, error: 'O campo "id" deve ser do tipo string e não deve estar vazio' }));
		if (!mongoose.Types.ObjectId.isValid(id)) return (callback({ code: 422, error: 'O campo "id" deve ser um ObjectId válido' }));
		const message = await mongodb.QuickMessage.findById(id).lean();
		if (!message) return (callback({ code: 404, error: "'id' não corresponde a busca" }));
		if (["audio", "image", "video", "document"].includes(message.message?.type)) await cloudflareR2.deleteFile(idPhone, message.message?.[message.message.type]?.link);
		await mongodb.deleteQuickMessage(idPhone, id);
		callback({ code: 204 });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "deleteQuickMessage": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}