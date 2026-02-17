import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA RESPONDER SE A JANELA DE RESPOSTA AO CLIENTE AINDA ESTA ABERTA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function replyWindow(socket, data, callback) {
	const { idPhone, phone } = socket.handshake.auth;

	try {
		const { timestamp } = await mongodb.Message.findOne({ idPhone: idPhone, phone: phone, direction: "inbound" }).sort({ _id: -1 }).select("timestamp -_id");
		const lastDate = new Date(timestamp);
		const expirationDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);

// console.log("expirationDate:", expirationDate)
// console.log("date:", (new Date()))
// console.log(expirationDate < (new Date()))
setTimeout(() => {
		callback(expirationDate > (new Date()));
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "replyWindow": ${error}`);
	}
}