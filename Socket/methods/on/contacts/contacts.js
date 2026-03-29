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
		const contacts = await mongodb.Contact.find({ idPhone }).select("-_id -__v");

console.log("veio aki:", contacts)
setTimeout(() => {
		callback(contacts);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "loadContacts": ${error}`);
	}
}