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
	const { phone } = data;

	try {
		if (!phone || typeof phone !== "string") return ;
		const message = await mongodb.Message.findOne({ idPhone: idPhone, phone: phone, direction: "inbound" }).sort({ _id: -1 }).select("timestamp -_id");
		const lastDate = new Date(message?.timestamp);
		const expirationDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);

// setTimeout(() => {			// REMOVENDO DELAY
		callback(expirationDate > (new Date()));
// }, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "replyWindow": ${error}`);
	}
}