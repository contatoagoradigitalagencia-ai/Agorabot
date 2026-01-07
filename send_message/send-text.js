import axios from "axios";

import { saveTextSent } from "../MongoDB/text.js";
import saveError from "../MongoDB/error.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR MENSAGENS SIMPLES
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} message MENSAGEM QUE SERA ENVIADA
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function sendText(account, number, message) {
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
				type: "text",
				text: {
					body: message
				}
			}
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${res.data}`);
		const wamid = res.data?.messages?.[0]?.id;
		if (!wamid) throw ("Wamid não retornado pela API da Meta");
		await saveTextSent(account.idPhone, wamid, number, message);
		return (wamid);
	} catch (error) {
		await saveError(account.idPhone, `Erro na função "sendText": ${error}`);
	}
}