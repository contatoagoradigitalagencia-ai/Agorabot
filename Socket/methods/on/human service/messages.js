import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief BUSCA TODOS OS CONTATOS QUE ESTAO ESPERANDO ATENDIMENTO HUMANO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getMessagesWaitingService(socket, data, callback) {
	const { idPhone } = socket.account;

	try {
		const contacts = await mongodb.Contact.find({ idPhone: idPhone, "humanService.waiting": true }).select("-_id phone humanService.timestamp").sort({ timestamp: -1 }).lean();

		callback({
			code: 200,
			contacts: contacts.map((contact) => ({ phone: contact.phone, timestamp: contact.humanService.timestamp }))
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "saveQuickMessage": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}

/**
 * @author VAMPETA
 * @brief INFORMAR QUE O CLIENTE JA FOI ATENDIDO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function removeWaitingService(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!phone || typeof phone !== "string") return (callback({ code: 400, error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		await mongodb.removeHumanService(idPhone, phone);

		callback({
			code: 204
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "removeWaitingService": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}