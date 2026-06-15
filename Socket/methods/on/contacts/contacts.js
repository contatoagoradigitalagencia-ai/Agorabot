import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO ENVIAR OS CONTATOS DE ACORDO COM O RANGE MENCIONADO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function loadContacts(socket, data, callback) {
	const { idPhone } = socket.account;

	try {
		const contacts = await mongodb.Contact.find({ idPhone: idPhone }).select("-_id -__v").lean();

		callback({
			code: 200,
			contacts: contacts
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "loadContacts": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO EDITAR O COMENTARIO DO CONTATO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function saveComment(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone, comment } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!phone || typeof phone !== "string") return (callback({ code: 400, error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		if (typeof comment !== "string") return (callback({ code: 400, error: 'O campo "comment" deve ser do tipo string' }));
		const res = await mongodb.saveComment(idPhone, phone, comment);

		if (res.matchedCount !== 1) callback({ code: 404, error: "'phone' não corresponde a busca" });
		callback({ code: 204 });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "saveCommet": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}