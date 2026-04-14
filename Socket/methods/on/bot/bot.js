import mongodb from "../../../../MongoDB/Mongodb.js";
import IA from "../../../../IA/IA.js";

/**
 * @author VAMPETA
 * @brief CONSULTA AS INFORMACOES GERAIS SOBRE O BOT (INCLUI PROMPT ESTADO DE ATIVACAO DO BOT E MENSAGENS PRE DEFINIDAS COMO ERRO OU MENSAGEM NAO SUPORTADA)
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getInfoBot(socket, data, callback) {
	const { idPhone } = socket.account;

	try {
		const account = await mongodb.Account.findOne({ idPhone: idPhone }).select("bot -_id");

setTimeout(() => {
		callback(account.bot);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getInfoBot": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief MUDA O STATUS DO BOT DE ATIVADO PARA DESATIVADO E VICE VERSA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateStatusBot(socket, data, callback) {
	const { idPhone } = socket.account;
	const { status } = data;

	try {
		if (typeof status !== "boolean") return (callback({ error: 'Deve existir um campo "status" do tipo boolean' }));
		await mongodb.updateStateBot(idPhone, status);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateStatusBot": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief MUDA O STATUS DE VISUALIZACAO DE MENSAGEM DO BOT DE ATIVADO PARA DESATIVADO E VICE VERSA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateVisualization(socket, data, callback) {
	const { idPhone } = socket.account;
	const { visualization } = data;

	try {
		if (typeof visualization !== "boolean") return (callback({ error: 'Deve existir um campo "visualization" do tipo boolean' }));
		await mongodb.updateVisualization(idPhone, visualization);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateVisualization": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief MUDA O STATUS DO BOT DE ATIVADO PARA DESATIVADO E VICE VERSA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updatePrompt(socket, data, callback) {
	const { idPhone } = socket.account;
	const { prompt } = data;

	try {
		if (typeof prompt !== "string") return (callback({ error: 'O campo "prompt" deve ser do tipo string' }));
		await mongodb.savePrompt(idPhone, prompt);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updatePrompt": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief USA IA PARA SUGERIR MELHORIA NO ATUAL PROMPT
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function promptSuggestion(socket, data, callback) {
	const { idPhone } = socket.account;
	const { prompt, input } = data;

	try {
		if (typeof prompt !== "string") return (callback({ error: 'O campo "prompt" deve ser do tipo string' }));
		if (!input || typeof input !== "string") return (callback({ error: 'O campo "input" deve ser do tipo string e não deve estar vazio' }));
		const res = await IA.groq.promptSuggestion(socket.account, prompt, input);
setTimeout(() => {
		callback(res);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "promptSuggestion": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief ATUALIZA A NOVA MENSAGEM DE MENSAGEM NAO SUPORTADA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateMessageNotSupported(socket, data, callback) {
	const { idPhone } = socket.account;
	const { message } = data;

	try {
		if (typeof message !== "string") return (callback({ error: 'O campo "message" deve ser do tipo string e não deve estar vazio' }));
		await mongodb.saveMessageNotSupported(idPhone, message);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateMessageNotSupported": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief ATUALIZA A MENSAGEM DE LOCALIZACAO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateLocation(socket, data, callback) {
	const { idPhone } = socket.account;
	const { name, address, latitude, longitude } = data;

	try {
		if (!name || typeof name !== "string") return (callback({ error: 'O campo "name" deve ser do tipo string e não deve estar vazio' }));
		if (!address || typeof address !== "string") return (callback({ error: 'O campo "address" deve ser do tipo string e não deve estar vazio' }));
		if (!latitude || typeof latitude !== "number") return (callback({ error: 'O campo "latitude" deve ser do tipo number e não deve estar vazio' }));
		if (!longitude || typeof longitude !== "number") return (callback({ error: 'O campo "longitude" deve ser do tipo number e não deve estar vazio' }));
		await mongodb.saveLocation(idPhone, name, address, latitude, longitude);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateLocation": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief ATUALIZA A NOVA MENSAGEM DE MENSAGEM PARA NOVOS CONTATOS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateMessageNewContact(socket, data, callback) {
	const { idPhone } = socket.account;
	const { message } = data;

	try {
		if (typeof message !== "string") return (callback({ error: 'O campo "message" deve ser do tipo string' }));
		await mongodb.saveMessageNewContact(idPhone, message);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateMessageNewContact": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief ATUALIZA A LISTA DE CONTATOS DE REDIRECIONAMENTO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateStatusRedirect(socket, data, callback) {
	const { idPhone } = socket.account;
	const { status } = data;

	try {
		if (typeof status !== "boolean") return (callback({ error: 'Deve existir um campo "status" do tipo boolean' }));
		await mongodb.updateStateRedirect(idPhone, status);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateStatusRedirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief ATUALIZA A LISTA DE CONTATOS DE REDIRECIONAMENTO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateNumbersRedirect(socket, data, callback) {
	const { idPhone } = socket.account;
	const { numbers } = data;

	try {
		if (!Array.isArray(numbers) || !numbers.every((item) => (typeof item === "string"))) return (callback('O campo "numbers" deve ser um array de strings'));
		await mongodb.newRedirect(idPhone, numbers);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateNumbersRedirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief ATUALIZA A MENSAGEM DE REDIRECIONAMENTO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateMessageRedirect(socket, data, callback) {
	const { idPhone } = socket.account;
	const { message } = data;

	try {
		if (typeof message !== "string") return (callback({ error: 'O campo "message" deve ser do tipo string' }));
		await mongodb.saveMessageRedirect(idPhone, message);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateMessageRedirect": ${error}`);
	}
}