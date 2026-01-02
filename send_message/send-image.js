import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR IMAGEM
 * @param number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param link URL DA IMAGEM ???
 * @param caption ???
*/
export default async function sendImage(number, link, caption) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
		headers: {
			Authorization: "Bearer " + process.env.ACCESS_TOKEN,
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

	// console.log(res.status)
}

					// AINDA NAO TERMINADO