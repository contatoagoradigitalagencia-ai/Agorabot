import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR IMAGEM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} link URL DA IMAGEM
 * @param {String} caption MENSAGEM QUE SERA ENVIADA JUNTO COM A IMAGEM
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function image(account, phone, link, caption) {
	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			type: "image",
			image: {
				link: link,
				caption: caption
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
		if (wamid) await this.mongodb.saveImageSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "image": ${error}`);
		return (null);
	}
}