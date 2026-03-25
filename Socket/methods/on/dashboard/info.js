import { DateTime } from "luxon";

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
		const count = await mongodb.Message.countDocuments({ idPhone: idPhone, timestamp: { $gte: last24h } });

		return (count);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getMessagesToday": ${error}`);
		return (null);
	}
}

// FALTOU BUSCAR activeChats E unread
// async function getActiveChats() {}
// async function getUnread() {}

async function getContacts(idPhone) {
	try {
		const count = await mongodb.Contact.countDocuments({ idPhone: idPhone });

		return (count);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getContacts": ${error}`);
		return (null);
	}
}


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
// 		const messagesToday = await getMessagesToday(idPhone);
// 		const contacts = await getContacts(idPhone);

// setTimeout(() => {
// 		callback({ messagesToday: messagesToday, activeChats: 10, unread: 3, contacts: contacts });
// }, 1000);


		const now = DateTime.now().setZone("America/Sao_Paulo");
		const start = now.startOf("day").toJSDate();
		const end = now.endOf("day").toJSDate();
		const metric = await mongodb.Metric.findOne(
			{
				idPhone: idPhone,
				timestamp: {
					$gte: start,
					$lte: end
				}
			}
		);
setTimeout(() => {
		callback(metric);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "infoDashboard": ${error}`);
	}
}