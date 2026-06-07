import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO QUE ATUALIZA O ESTADO DE VISUALIZADO POR UM HUMANO NO BANCO DE DADOS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateHumanViewed(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!phone || typeof phone !== "string") return (callback({ code: 400, error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		await mongodb.saveHumanView(idPhone, phone);
		callback({ code: 204 });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateHumanViewed": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}