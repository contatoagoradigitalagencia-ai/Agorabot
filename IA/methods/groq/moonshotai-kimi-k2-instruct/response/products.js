import mongodb from "../../../../../MongoDB/Mongodb.js";
import googleSheets from "../../../../../Google Sheets/GoogleSheets.js";

import { promptProducts } from "../prompt/products.js";

/**
 * @author VAMPETA
 * @brief INTERPRETA A MENSAGEM E GERA UMA RESPOSTA COM OS PRECOS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function products(account, message) {
	try {
		const spreadsheets = (account.googleSheets) ? await googleSheets.getPageJsonText(account) : undefined;
		const messages = [
			{
				role: "system",
				content: promptProducts + spreadsheets
			},
			...(await this.groq.chatHistory(account, message))
		];
		const res = await this.groq.groq.chat.completions.create({
			model: "moonshotai/kimi-k2-instruct",
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