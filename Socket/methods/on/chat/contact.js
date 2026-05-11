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
	const { phone } = data;

	try {
		if (!phone || typeof phone !== "string") return (callback({ error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		const res = await mongodb.Contact.findOne({ idPhone: idPhone, phone: phone }).select("-_id -__v");

		callback(res);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "infoContact": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA CONSULTAR O ESTADO DO BOT SE "stateBot" FOR undefined OU MODIFICAR O ESTADO DO BOT CASO "stateBot" TENHA UM VALOR
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function botOnOff(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone, stateBot } = data;

	try {
		if (!phone || typeof phone !== "string") return (callback({ error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		if (typeof stateBot === "undefined") return (callback({ error: 'O campo "stateBot" deve ser do tipo boolean' }));
		await mongodb.saveStateBot(idPhone, phone, stateBot);
		callback(204);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "botOnOff": ${error}`);
	}
}