import axios from "axios";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR TEMPLATES
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} template NOME DO TEMPLATE
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function template(account, phone, template) {
	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			type: "template",
			template: {
				name: template,
				language: {
					code: "pt_BR"
				}
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
		// await mongodb.saveTemplateSent(account.idPhone, wamid, phone, data);
		return (wamid);



// const response = await axios({
//   method: "get",
//   url: "https://graph.facebook.com/v22.0/" + "1928907784506308" + "/message_templates",
//   headers: {
//     Authorization: "Bearer " + "EAFrQAbUntCsBQIEWpKEx2QfQNIQOTd6VOz3ZBUolzZAcnbZC4I0EpU2HpjMqKgB9zx7WBcHy0g2QRoMerYRRKj35QGf7y3CZCwuBfiYJqNABm12Ts9pWqGa3bD9IKkgfX3pZBBoHpK2W6p4k5tQUjoAVsO8P5q9KeZAxAltyzYDXQQrZAYanfXKHjBB7DZA4fgZDZD"
//   }
// });

// // console.log(response.data.data);
// console.log(response.data);

	} catch (error) {
		await mongodb.saveError(account.idPhone, `Erro na função "template": ${error}`);
		return (null);
	}
}