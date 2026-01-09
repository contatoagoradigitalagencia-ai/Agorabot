import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA REAGIR A UMA MENSAGEM
 * @param number NUMERO QUE VAI RECEBER A REACAO
 * @param wamid ID DA MENSAGEM QUE VAI SER REAGIDA
 * @param emoji EMOJI QUE SERA USADO NA REACAO
*/
export default async function reactMessage(number, wamid, emoji) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
		headers: {
			Authorization: "Bearer " + process.env.ACCESS_TOKEN,
		},
		data: {
			messaging_product: "whatsapp",
			to: number,
			type: "reaction",
			reaction: {
				message_id: wamid,
				emoji: emoji
			}
		}
	});

}

					// AINDA NAO TERMINADO