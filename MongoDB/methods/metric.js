import { DateTime } from "luxon";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR METRICAS DE MENSAGENS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} direction INDICADOR DE ONDE VEIO A MENSAGEM (received OU sent)
 * @param {String} type TIPO DA MENSAGEM
*/
export async function saveMetricMessage(idPhone, direction, type) {
	try {
		const now = DateTime.now().setZone("America/Sao_Paulo");
		const today = now.startOf("day").toJSDate();
		const hour = now.hour.toString();

		await this.Metric.updateOne(
			{
				idPhone: idPhone,
				timestamp: today
			},
			{
				$inc: {
					[`${direction}.${type}`]: 1,
					[`hourly.${hour}`]: 1
				}
			},
			{ upsert: true }
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveMetricMessage": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR METRICAS DE NOVOS CONTATOS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
*/
export async function saveMetricNewContact(idPhone) {
	try {
		const now = DateTime.now().setZone("America/Sao_Paulo");
		const today = now.startOf("day").toJSDate();

		await this.Metric.updateOne(
			{
				idPhone: idPhone,
				timestamp: today
			},
			{
				$inc: {
					newContacts: 1
				}
			},
			{ upsert: true }
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveMetricMessage": ${error}`);
	}
}