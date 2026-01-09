import axios from "axios"

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR UMA MENSAGEM COM LISTA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} text TEXTO/TITULO MOSTRADO AO USUARIO
 * @param {String} button TEXTO DO BOTAO CLICAVEL DA LISTA
 * @param {Array} list ARRAY COM ITENS DA LISTA
*/
export default async function list(account, number, text, button, list) {
	try {
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: {
				messaging_product: "whatsapp",
				to: number,
				type: "interactive",
				interactive: {
					type: "list",
					body: { text: text },
					action: {
						button: button,
						sections: [
							{
								title: "Categoria A",
								rows: list
							}
						]
					}
				}
			}
		});

        if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${res.data}`);
		const wamid = res.data?.messages?.[0]?.id;
		if (!wamid) throw ("Wamid não retornado pela API da Meta");
		if (wamid) await this.mongodb.saveListSent(account.idPhone, wamid, number, text, button, list);
		return (wamid);
	} catch (error) {
		await saveError(account.idPhone, `Erro na função "list": ${error}`);
		return (null);
	}
}