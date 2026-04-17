import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief CONSULTA AS MENSAGENS RAPIDAS SALVAS NO BANCO DE DADOS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getQuickMessages(socket, data, callback) {
	const { idPhone } = socket.account;
	
	try {
// console.log("foi")
		const messages = await mongodb.QuickMessage.find({ idPhone: idPhone }).select("-_id -idPhone");

console.log(messages)
setTimeout(() => {
		// callback(account.bot);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getQuickMessages": ${error}`);
	}
}