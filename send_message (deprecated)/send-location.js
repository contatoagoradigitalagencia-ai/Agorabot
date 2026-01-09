import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR UM ENDERECO
 * @param number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param latitude LATITUDE DO MAPA
 * @param longitude LONGITUDE DO MAPA
 * @param name NOME DO LUGAR
 * @param address ENDERECO DO LUGAR
*/
export default async function sendLocation(number, latitude, longitude, name, address) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
		headers: {
			Authorization: "Bearer " + process.env.ACCESS_TOKEN,
		},
		data: {
			messaging_product: "whatsapp",
			to: number,
			type: "location",
			location: {
				latitude: latitude,
				longitude: longitude,
				name: name,
				address: address
			}
		}
	});

}

					// AINDA NAO TERMINADO