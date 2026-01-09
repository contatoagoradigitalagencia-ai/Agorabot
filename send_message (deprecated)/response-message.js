import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA RESPONDER UMA MENSAGEM
 * @param wamid ID DA MENSAGEM QUE SERA RESPONDIDA
 * @param number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param message MENSAGEM QUE SERA ENVIADA
*/
export default async function responseMessage(wamid, number, message) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
		headers: {
			Authorization: "Bearer " + process.env.ACCESS_TOKEN
		},
		data: {
			messaging_product: "whatsapp",
			to: number,
			context: {
				message_id: wamid
			},
			type: "text",
			text: {
				body: message
			}
		}
	});
}

					// AINDA NAO TERMINADO