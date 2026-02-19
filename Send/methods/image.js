import axios from "axios";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR IMAGEM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Object} options OBTETO QUE PODE RECEBER context E image (OBRIGATORIO)
 * @param {Object} [options.context] CAMPO OPICIONAL PARA INDICAR QUE ESTA MENSAGEM E UMA RESPOSTA A OUTRA (OPCIONAL)
 * @param {Object} [options.image] IMAGEM COM DESCRICAO QUE SERA ENVIADA (O link E OBRIGATORIO MAS O caption NAO)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function image(account, phone, options = {}) {
	const { context, image } = options;

	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			context: (context) ? {
				message_id: context.message_id
			} : undefined,
			type: "image",
			image: {
				link: image.link,
				caption: image.caption
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
		// if (wamid) await this.mongodb.saveImageSent(account.idPhone, wamid, phone, data);
		if (wamid) await mongodb.saveImageSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		// await this.mongodb.saveError(account.idPhone, `Erro na função "image": ${error}`);
		await mongodb.saveError(account.idPhone, `Erro na função "image": ${error}`);
		return (null);
	}
}