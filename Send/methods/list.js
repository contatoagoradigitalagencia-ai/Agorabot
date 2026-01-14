import axios from "axios"

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR UMA MENSAGEM COM LISTA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Object} options OBTETO QUE RECEBE header body E footer (OBRIGATORIO SOMENTE O body)
 * @param {Object} [options.header] TITULO DESCRITIVO DA LISTA QUE PODE SER ADICIONADO (OPCIONAL)
 * @param {Object} [options.body] TEXTO PRINCIPAL MOSTRADO AO USUARIO (OBRIGATORIO)
 * @param {Object} [options.footer] TEXTO EXTRA QUE PODE SER ADICIONADO DEPOIS DE body (OPCIONAL)
 * @param {String} [options.button] TEXTO DO BOTAO QUE ABRE A LISTA (OBRIGATORIO)
 * @param {Array<Object>} [options.section] ARRAY COM CATEGORIAS E DENTRO UMA LISTA DE ITENS DA LISTA (OBRIGATORIO)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function list(account, phone, options = {}) {
	const { context, header, body, footer, action } = options;

	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			context: (context) ? {
				message_id: context.message_id
			} : undefined,
			type: "interactive",
			interactive: {
				type: "list",
				header: (header) ? {
					type: "text",
					text: header.text
				} : undefined,
				body: {
					text: body.text
				},
				footer: (footer) ? {
					text: footer.text
				} : undefined,
				action: {
					button: action.button,
					sections: action.sections
				}
			}
		}
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
		if (wamid) await this.mongodb.saveListSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "list": ${error}`);
		return (null);
	}
}



// const sections = [		// PADRAO DO CAMPO sections
// 	{
// 		title: "categoria 1",
// 		rows: [
// 			{
// 				id: 1,
// 				title: "title 1",
// 				description: "description 1"
// 			},
// 			{
// 				id: 2,
// 				title: "title 2",
// 				description: "description 2"
// 			},
// 			{
// 				id: 3,
// 				title: "title 3",
// 				description: "description 3"
// 			}
// 		]
// 	},
// 	{
// 		title: "categoria 2",
// 		rows: [
// 			{
// 				id: 1,
// 				title: "title 1",
// 				description: "description 1"
// 			},
// 			{
// 				id: 2,
// 				title: "title 2",
// 				description: "description 2"
// 			},
// 			{
// 				id: 3,
// 				title: "title 3",
// 				description: "description 3"
// 			}
// 		]
// 	},
// 	{
// 		title: "categoria 3",
// 		rows: [
// 			{
// 				id: 1,
// 				title: "title 1",
// 				description: "description 1"
// 			},
// 			{
// 				id: 2,
// 				title: "title 2",
// 				description: "description 2"
// 			},
// 			{
// 				id: 3,
// 				title: "title 3",
// 				description: "description 3"
// 			}
// 		]
// 	},
// ];