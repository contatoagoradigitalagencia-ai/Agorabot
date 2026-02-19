import axios from "axios";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGENS SIMPLES
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Object} options OBTETO QUE PODE RECEBER context E image (OBRIGATORIO)
 * @param {Object} [options.context] CAMPO OPICIONAL PARA INDICAR QUE ESTA MENSAGEM E UMA RESPOSTA A OUTRA (OPCIONAL)
 * @param {Object} [options.location] CONTEM LATITUDE LONGITUDE NAME E ADDRESS (SOMENTE LATITUDE E LONGITUDE SAO OBRIGATORIOS OBRIGATORIO)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function location(account, phone, options = {}) {
	const { context, location } = options;

	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			context: (context) ? {
				message_id: context.message_id
			} : undefined,
			type: "location",
			location: {
				latitude: location.latitude,
				longitude: location.longitude,
				name: location.name,
				address: location.address
			}
		};
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: data
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${JSON.stringify(res.data, null, 2)}`);
		const wamid = res.data?.messages?.[0]?.id;
		if (!wamid) throw ("Wamid não retornado pela API da Meta");
		delete data.messaging_product;
		delete data.to;
		// await this.mongodb.saveLocationSent(account.idPhone, wamid, phone, data);
		await mongodb.saveLocationSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		// await this.mongodb.saveError(account.idPhone, `Erro na função "location": ${error}`);
		await mongodb.saveError(account.idPhone, `Erro na função "location": ${error}`);
		return (null);
	}
}