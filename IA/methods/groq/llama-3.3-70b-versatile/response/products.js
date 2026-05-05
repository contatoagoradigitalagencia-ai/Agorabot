import mongodb from "../../../../../MongoDB/Mongodb.js";
import googleSheets from "../../../../../Google Sheets/GoogleSheets.js";

import { promptProducts } from "../prompt/products.js";

/**
 * @author VAMPETA
 * @brief INTERPRETA A MENSAGEM E GERA UMA RESPOSTA COM OS PRECOS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIO A MENSAGEM
*/
export async function products(account, phone) {
	try {
		const spreadsheets = (account.googleSheets) ? await googleSheets.getPageJsonText(account) : undefined;
		const messages = [
			{
				role: "system",
				content: promptProducts + spreadsheets
			},
			...(await this.groq.chatHistory(account, phone, 3))
		];
		const res = await this.groq.groq.chat.completions.create({
			model: "llama-3.3-70b-versatile",
			messages: messages,
			max_tokens: 500,
			response_format: { type: "text" },
			temperature: 0,
			top_p: 0.9
		});

		return (res.choices[0].message.content);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "products": ${error}`);
		return (null);
	}
}