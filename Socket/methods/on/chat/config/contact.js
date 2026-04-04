import mongodb from "../../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA CONSULTAR OS DADOS DO CONTATO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function infoContact(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone } = data;

	try {
		if (!phone || typeof phone !== "string") return (callback({ error: "Número ausente" }));
		const res = await mongodb.Contact.findOne({ idPhone: idPhone, phone: phone }).select("-_id -__v");

setTimeout(() => {
		callback(res);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getinfo": ${error}`);
	}
}