import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief 
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