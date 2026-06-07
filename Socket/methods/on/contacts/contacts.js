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
	const { phone, comment } = data;

	try {
		if (!phone) return (callback({ error: "Número ausente" }));
		if (!comment) return (callback({ error: "Comentário ausente" }));
		const res = await mongodb.saveComment(idPhone, phone, comment);

		callback((res.matchedCount === 1) ? 200 : 404);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "saveCommet": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}