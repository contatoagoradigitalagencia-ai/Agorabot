import { DateTime } from "luxon";

import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO QUE CONSULTA OS DADOS QUE SERAM EXIBIDOS NO DASHBOARD
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function infoDashboard(socket, data, callback) {
	const { idPhone } = socket.account;
	const { date } = data;

	try {
		if (!date) return (callback({ error: "Data ausente" }));
		const dataFormatted = (date) ? DateTime.fromISO(date, { zone: "America/Sao_Paulo" }) : DateTime.now().setZone("America/Sao_Paulo");
		if (!dataFormatted.isValid) return (callback({ error: "Data inválida" }));
		const start = dataFormatted.startOf("day").toJSDate();
		const end = dataFormatted.endOf("day").toJSDate();
		const metric = await mongodb.Metric.findOne(
			{
				idPhone: idPhone,
				timestamp: {
					$gte: start,
					$lte: end
				}
			}
		).select("-_id -__v -idPhone");

setTimeout(() => {
		if (metric) return (callback(metric));
		callback({
			timestamp: start,
			hourly: {},
			received: {},
			sent: {},
			newContacts: 0
		});
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "infoDashboard": ${error}`);
	}
}