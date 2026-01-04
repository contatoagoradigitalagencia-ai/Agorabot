import axios from "axios";

import { saveImageSent } from "../MongoDB/image.js";
import saveError from "../MongoDB/error.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR IMAGEM
 * @param {String} number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} link URL DA IMAGEM
 * @param {String} caption MENSAGEM QUE SERA ENVIADA JUNTO COM A IMAGEM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function sendImage(number, link, caption, account) {
	try {
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: {
				messaging_product: "whatsapp",
				to: number,
				type: "image",
				image: {
					link: link,
					caption: caption
				}
			}
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${res.data}`);
		const wamid = res.data?.messages?.[0]?.id;
		if (!wamid) throw ("Wamid não retornado pela API da Meta");
		if (wamid) await saveImageSent(account.idPhone, wamid, number, link, caption);
		return (wamid);
	} catch (error) {
		await saveError(account.idPhone, `Erro na função "sendImage": ${error}`);
	}
}