import axios from "axios";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR TEMPLATES
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} template NOME DO TEMPLATE
 * @param {Object} options OBJETO OPCIONAL COM language E parameters (variáveis do corpo do template)
 * @param {String} [options.language] CODIGO DO IDIOMA DO TEMPLATE (padrão pt_BR)
 * @param {Array<String>} [options.parameters] VALORES DAS VARIAVEIS {{1}}, {{2}}... DO CORPO DO TEMPLATE, NA ORDEM
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function template(account, phone, template, options = {}) {
	const { language, parameters } = options;

	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			type: "template",
			template: {
				name: template,
				language: {
					code: language || "pt_BR"
				},
				components: (Array.isArray(parameters) && parameters.length)
					? [{ type: "body", parameters: parameters.map((text) => ({ type: "text", text: String(text) })) }]
					: undefined
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
		await mongodb.saveTemplateSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Erro na função "template": ${error}`);
		return (null);
	}
}
