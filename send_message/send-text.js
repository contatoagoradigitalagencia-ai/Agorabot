import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR MENSAGENS SIMPLES
 * @param {String} number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} message MENSAGEM QUE SERA ENVIADA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function sendText(number, message, account) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + account.identificacao_do_numero_de_telefone + "/messages",
		headers: {
			Authorization: "Bearer " + account.access_token
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

	return ((res.status === 200 && wamid) ? wamid : null);
}