import mongodb from "../../../../MongoDB/Mongodb.js";
import messages from "../../../../MongoDB/schemas/messages.js";

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
		if (!type || typeof type !== "string") return (callback({ error: 'O campo "type" deve ser do tipo string e não deve estar vazio' }));
		if (type !== "text" && type !== "location") return (callback({ error: `Tipo de mensagem "${type}" não existe` }));
		const messages = await mongodb.QuickMessage.find({ idPhone: idPhone, "message.type": type }).select("-idPhone").lean();;
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
	if (!name || typeof name !== "string") return ('O campo "name" deve ser do tipo string e não deve estar vazio');
	if (!message || typeof message !== "object") return ('O campo "message" deve ser do tipo string e não deve estar vazio');
	switch (message.type) {
		case "text":
			if (!message.text) return ('O campo "message.text" não deve estar vazio');
			if (!message.text.body || typeof message.text.body !== "string") return ('O campo "message.text.body" deve ser do tipo string e não deve estar vazio');
			break;
		case "location":
			if (typeof message.location.name !== "string") return ('O campo "message.location.name" deve ser do tipo string');
			if (typeof message.location.address !== "string") return ('O campo "message.location.address" deve ser do tipo string');
			if (!message.location.latitude || typeof message.location.latitude !== "string") return ('O campo "message.location.latitude" deve ser do tipo string e não deve estar vazio');
			if (!message.location.longitude || typeof message.location.longitude !== "string") return ('O campo "message.location.longitude" deve ser do tipo string e não deve estar vazio');
			break;
	}
	return (null);
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
		await mongodb.deleteQuickMessage(idPhone, id);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "deleteQuickMessage": ${error}`);
	}
}