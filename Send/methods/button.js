import axios from "axios";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR BOTOES CLICAVEIS PARA O CLIENTE
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Object} options OBTETO QUE RECEBE header body E footer (OBRIGATORIO SOMENTE O body E action)
 * @param {Object} [options.context] CAMPO OPICIONAL PARA INDICAR QUE ESTA MENSAGEM E UMA RESPOSTA A OUTRA (OPCIONAL)
 * @param {Object} [options.header] TITULO DESCRITIVO DOS BOTOES QUE PODE SER ADICIONADO (OPCIONAL)
 * @param {Object} [options.body] TEXTO PRINCIPAL MOSTRADO AO USUARIO (OBRIGATORIO)
 * @param {Object} [options.footer] TEXTO EXTRA QUE PODE SER ADICIONADO DEPOIS DE body (OPCIONAL)
 * @param {Array<Object>} [options.action] ARRAY DE OBJETOS COM OS BOTOES (OBRIGATORIO)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function button(account, phone, options = {}) {
	const { context, header, body, footer, action } = options;
	let headerKey = null;
	let headerValue = null;

	try {
		if (header) {
			headerKey = Object.keys(header)[0];
			headerValue = header[headerKey];
		}
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			context: (context) ? {
				message_id: context.message_id
			} : undefined,
			type: "interactive",
			interactive: {
				type: "button",
				header: (header) ? {
					type: headerKey,
					[headerKey]: headerValue
				} : undefined,
				body: {
					text: body.text
				},
				footer: (footer) ? {
					text: footer.text
				} : undefined,
				action: {
					buttons: action.buttons
				}
			},
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
		await this.mongodb.saveButtonSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "button": ${error}`);
		return (null);
	}
}



// const buttons = [		// PADRAO DO CAMPO buttons
// 	{
// 		type: "reply",
// 		reply:
// 		{
// 			id: 1,
// 			title: "title 1"
// 		}
// 	},
// 	{
// 		type: "reply",
// 		reply: {
// 			id: 2,
// 			title: "title 2"
// 		}
// 	}
// ];