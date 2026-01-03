import axios from "axios";

import { saveTextSent } from "../MongoDB/text.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR MENSAGENS SIMPLES
 * @param {String} number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} message MENSAGEM QUE SERA ENVIADA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function sendText(number, message, account) {
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
	const wamid = res.data?.messages[0]?.id;

	if (wamid) await saveTextSent(account.idPhone, wamid, number, message);
	return ((res.status === 200 && wamid) ? wamid : null);
}