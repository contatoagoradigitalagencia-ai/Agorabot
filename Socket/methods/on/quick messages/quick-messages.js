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
	const { type } = data;

	try {
		if (!type || typeof type !== "string") return (callback({ error: 'O campo "type" deve ser do tipo string e não deve estar vazio' }));
		if (type !== "text" && type !== "location") return (callback({ error: `Tipo de mensagem "${type}" não existe` }));
		const messages = await mongodb.QuickMessage.find({ idPhone: idPhone, "message.type": type }).select("-_id -idPhone");

// console.log(messages)
setTimeout(() => {
		callback(messages);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getQuickMessages": ${error}`);
	}
}