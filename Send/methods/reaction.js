import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA REAGIR A UMA MENSAGEM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A REACAO
 * @param {Object} options OBTETO QUE RECEBE reaction (OBRIGATORIO)
 * @param {Object} [options.reaction] CONTEM O ID DA MENSAGEM REAGIDA E O EMOJI (OBRIGATORIO)
 * @return {String} RETORNA O WAMID DA REACAO DA MENSAGEM 
*/
export default async function reaction(account, phone, options = {}) {
	const { reaction } = options;

	try {
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken,
			},
			data: {
				messaging_product: "whatsapp",
				to: phone,
				type: "reaction",
				reaction: {
					message_id: reaction.message_id,
					emoji: reaction.emoji
				}
			}
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${JSON.stringify(res.data, null, 2)}`);
		const wamidReact = res.data?.messages?.[0]?.id;
		if (!wamidReact) throw ("Wamid não retornado pela API da Meta");
		await this.mongodb.saveReactionSent(account.idPhone, wamid, phone, emoji);
		return (wamidReact);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "reaction": ${error}`);
		return (null);
	}
}