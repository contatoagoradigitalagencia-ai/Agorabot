import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA RESPONDER SE A JANELA DE RESPOSTA AO CLIENTE AINDA ESTA ABERTA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function replyWindow(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!phone || typeof phone !== "string") return (callback({ code: 400, error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		const message = await mongodb.Message.findOne({ idPhone: idPhone, phone: phone, direction: "inbound" }).sort({ _id: -1 }).select("timestamp -_id").lean();
		const lastDate = new Date(message?.timestamp);
		const expirationDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);

		callback({
			code: 200,
			expiration: expirationDate < (new Date())
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "replyWindow": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}