import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief CONSULTA AS INFORMACOES GERAIS SOBRE O BOT (INCLUI PROMPT ESTADO DE ATIVACAO DO BOT E MENSAGENS PRE DEFINIDAS COMO ERRO OU MENSAGEM NAO SUPORTADA)
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getInfoBot(socket, data, callback) {
	const { idPhone, phone } = socket.account;

	try {
		const account = await mongodb.Account.findOne({ idPhone: idPhone, phone: phone }).select("bot -_id");

setTimeout(() => {
		callback({
			activated: account.bot.activated
		});
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getInfoBot": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief MUDA O STATUS DO BOT DE ATIVADO PARA DESATIVADO E VICE VERSA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateStatusBot(socket, data, callback) {
	const { idPhone, phone } = socket.account;

	try {
		// const account = await mongodb.Account.findOne({ idPhone: idPhone, phone: phone }).select("bot -_id");

setTimeout(() => {
		callback(200);				// ACHO Q DEVERIA CONFIRMAR O NOVO STATUS COM UMA RESPOSTA MAIS EXPLICITA
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateStatusBot": ${error}`);
	}
}