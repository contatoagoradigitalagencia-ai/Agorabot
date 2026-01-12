import axios from "axios";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR BOTOES CLICAVEIS PARA O CLIENTE
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} tilte TITULO DOS BOTOES
 * @param {Array} buttons ARRAY DE TEXTOS QUE SERAO MOSTRADOS NO BOTAO
 * @param {Object} header OBJETO QUE PODE CONTER UMA TEXTO IMAGEM VIDEO OU DOCUMENTO (OPCIONAL)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function button(account, phone, title, buttons, header) {
	let headerKey = null;
	let headerValue = null;

	try {
		if (buttons.length === 0) throw (`O parametro "buttons" recebeu 0 elementos (o mínimo são 1)`);
		if (buttons.length > 3) throw (`O parametro "buttons" recebeu ${buttons.length} elementos (o máximo são 3)`);
		if (header) {
			headerKey = Object.keys(header)[0];
			headerValue = header[headerKey];
		}
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: {
				messaging_product: "whatsapp",
				to: phone,
				type: "interactive",
				interactive: {
					type: "button",
					header: (header) ? {
						type: headerKey,
						[headerKey]: headerValue
					} : undefined,
					body: {
						text: title
					},
					action: {
						buttons: buttons.map((title, i) => ({
							type: "reply",
							reply: {
								id: i,
								title: title
							}
						}))
					}
				},
			}
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${JSON.stringify(res.data, null, 2)}`);
		const wamid = res.data?.messages?.[0]?.id;
		if (!wamid) throw ("Wamid não retornado pela API da Meta");
		// await this.mongodb.saveButtonSent();				// TA FALTANDO CRIAR ISSO AKI (ANTES EU PRECISO CRIAR SCHEMA E UMA FUNCAO DENTRO DO MONGODB)
		return (wamid);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "buttons": ${error}`);
		return (null);
	}
}