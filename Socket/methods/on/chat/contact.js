import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA CONSULTAR OS DADOS DO CONTATO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function infoContact(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!phone || typeof phone !== "string") return (callback({ code: 400, error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		const res = await mongodb.Contact.findOne({ idPhone: idPhone, phone: phone }).select("-_id -__v").lean();

		if (!res) return (callback({ code: 404, error: "'phone' não corresponde a busca" }));
		callback({ ...res, code: 200 });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "infoContact": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA LIGAR OU DESLIGAR O BOT DE UMA UNICA CONVERSA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function botOnOff(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone, stateBot } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!phone || typeof phone !== "string") return (callback({ code: 400, error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		if (typeof stateBot !== "boolean") return (callback({ code: 400, error: 'O campo "stateBot" deve ser do tipo boolean' }));
		await mongodb.saveStateBot(idPhone, phone, stateBot);
		callback({ code: 204 });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "botOnOff": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}