import axios from "axios";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGENS SIMPLES
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} message MENSAGEM QUE SERA ENVIADA
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function text(account, phone, message) {
	try {
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: {
				messaging_product: "whatsapp",
				to: phone,
				type: "text",
				text: {
					body: message
				}
			}
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${res.data}`);
		const wamid = res.data?.messages?.[0]?.id;
		if (!wamid) throw ("Wamid não retornado pela API da Meta");
		await this.mongodb.saveTextSent(account.idPhone, wamid, phone, message);
		return (wamid);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "text": ${error}`);
		return (null);
	}
}