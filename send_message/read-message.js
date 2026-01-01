import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA CONFIRMAR A LEITURA DA MENSAGEM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} wamid ID DA MENSAGEM QUE VAI SER CONFIRMADA A LEITURA
*/
export default async function readMessage(account, wamid) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + account.identificacao_do_numero_de_telefone + "/messages",
		headers: {
			Authorization: "Bearer " + account.access_token
		},
		data: {
			messaging_product: "whatsapp",
			status: "read",
			message_id: wamid
		}
	});

	return (res.status === 200 && res.data.success);
}