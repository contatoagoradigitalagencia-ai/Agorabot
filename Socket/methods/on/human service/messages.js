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

		callback(contacts.map((contact) => ({ phone: contact.phone, timestamp: contact.humanService.timestamp })));
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "saveQuickMessage": ${error}`);
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
	const { phone } = data;

	try {
		if (!phone || typeof phone !== "string") return (callback({ error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		await mongodb.removeHumanService(idPhone, phone);

		callback(204);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "removeWaitingService": ${error}`);
	}
}