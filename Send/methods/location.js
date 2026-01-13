import axios from "axios";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGENS SIMPLES
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Float} latitude LATIDUDE DO MAPA MUNDI
 * @param {Float} longitude LONGITUDE DO MAPA MUNDI
 * @param {String} name NOME DADO NO CORPO DA MENSAGEM (TEXTO DE LIVRE DIGITACAO E NAO VERIFICADO PELA META)
 * @param {String} address ENDERECO COMPLETO (TEXTO DE LIVRE DIGITACAO E NAO VERIFICADO PELA META)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function location(account, phone, latitude, longitude, name, address) {
	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			type: "location",
			location: {
				latitude: latitude,
				longitude: longitude,
				name: name,
				address: address
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
		await this.mongodb.saveLocationSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "location": ${error}`);
		return (null);
	}
}