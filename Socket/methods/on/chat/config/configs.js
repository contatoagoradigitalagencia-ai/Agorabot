import mongodb from "../../../../../MongoDB/Mongodb.js";

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
		if (!phone || typeof phone !== "string") return (callback({ error: "Um número de contato deve ser enviado" }));
		if (typeof stateBot === "undefined") return (callback({ error: "Novo estado do bot não enviado" }));
		await mongodb.saveStateBot(idPhone, phone, stateBot);
		callback(204);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "botOnOff": ${error}`);
	}
}