import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA REAGIR A UMA MENSAGEM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} number NUMERO QUE VAI RECEBER A REACAO
 * @param {String} wamid ID DA MENSAGEM QUE VAI SER REAGIDA
 * @param {String} emoji EMOJI QUE SERA USADO NA REACAO
 * @return {String} RETORNA O WAMID DA REACAO DA MENSAGEM 
*/
export default async function react(account, number, wamid, emoji) {
	try {
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken,
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

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${res.data}`);
		const wamidReact = res.data?.messages?.[0]?.id;
		if (!wamidReact) throw ("Wamid não retornado pela API da Meta");
		await this.mongodb.saveReactSent();
		return (wamidReact);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "react": ${error}`);
		return (null);
	}
}