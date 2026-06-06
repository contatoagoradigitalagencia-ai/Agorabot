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
	const { date } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!date) return (callback({ code: 400, error: '"date" ausente' }));
		const dataFormatted = (date) ? DateTime.fromISO(date, { zone: "America/Sao_Paulo" }) : DateTime.now().setZone("America/Sao_Paulo");
		if (!dataFormatted.isValid) return (callback({ code: 422, error: '"date" inválido' }));
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
		).select("-_id -__v -idPhone").lean();

		if (metric) return (callback({ ...metric, code: 200 }));
		callback({
			code: 200,
			timestamp: start,
			hourly: {},
			received: {},
			sent: {},
			newContacts: 0,
			redirects: 0
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "infoDashboard": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}