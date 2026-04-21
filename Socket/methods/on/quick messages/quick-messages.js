import mongodb from "../../../../MongoDB/Mongodb.js";
import messages from "../../../../MongoDB/schemas/messages.js";

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
		const messages = await mongodb.QuickMessage.find({ idPhone: idPhone, "message.type": type }).select("-idPhone").lean();;
		const res = messages.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
// console.log(res)
setTimeout(() => {
		callback(res);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getQuickMessages": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief SALVA OU ATUALIZA UMA MENSAGEM RAPIDA DO TIPO TEXTO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function saveQuickMessageText(socket, data, callback) {		// SERA Q DEVO FAZER UMA UNICA FUNCAO PARA TODOS OS TIPOS DE MENSAGENS?
	const { idPhone } = socket.account;
	const { id, name, message } = data;			// AKI TENHO Q VERIFICAR CAMPOS Q NAO DEVERIAM EXISTIR?

	try {
		if (!name || typeof name !== "string") return (callback({ error: 'O campo "name" deve ser do tipo string e não deve estar vazio' }));
		if (!message || typeof message !== "object") return (callback({ error: 'O campo "message" deve ser do tipo string e não deve estar vazio' }));
		const _id = await mongodb.saveQuickMessageText(idPhone, id, name, message);

// console.log(_id)
setTimeout(() => {
		callback({ id: _id });
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "saveQuickMessageText": ${error}`);
	}
}