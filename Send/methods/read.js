import axios from "axios";

/**
 * @author VAMPETA
 * @brief METODOO CRIADO PARA CONFIRMAR A LEITURA DA MENSAGEM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} wamid ID DA MENSAGEM QUE VAI SER CONFIRMADA A LEITURA
 * @return {Boolean} RETORNA TRUE PARA SUCESSO E FALSE PARA FALHA
*/
export default async function read(account, wamid) {
	try {
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: {
				messaging_product: "whatsapp",
				status: "read",
				message_id: wamid
			}
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${JSON.stringify(res.data, null, 2)}`);
		return (res.status === 200 && res.data.success);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "read": ${error}`);
		return (false);
	}
}