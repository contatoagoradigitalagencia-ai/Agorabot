import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE BUSCA O NUMERO DE MENSAGENS DAS ULTIMAS 24HRS
 * @param {String} socket OBJETO SOCKET DO CLIENTE
*/
async function getMessagesToday(idPhone) {
	try {
	const now = new Date();
	const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
	const count = await mongodb.Message.countDocuments({
		idPhone: idPhone,
		timestamp: { $gte: last24h }
	});

	return (count);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getMessagesToday": ${error}`);
		return (null);
	}
}

// FALTOU BUSCAR activeChats E unread
// async function getActiveChats() {}
// async function getUnread() {}

/**
 * @author VAMPETA
 * @brief METODO QUE CONSULTA OS DADOS QUE SERAM EXIBIDOS NO DASHBOARD
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function infoDashboard(socket, data, callback) {
	const { idPhone } = socket.account;

	try {
		const messagesToday = await getMessagesToday(idPhone);

setTimeout(() => {
		callback({ messagesToday: messagesToday, activeChats: 10, unread: 3 });
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "infoDashboard": ${error}`);
	}
}