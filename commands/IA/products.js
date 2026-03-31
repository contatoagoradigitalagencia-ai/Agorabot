import mongodb from "../../MongoDB/Mongodb.js";
import googleSheets from "../../Google Sheets/GoogleSheets.js";
import groq from "../../Groq/Groq.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief INTERPRETA A MENSAGEM E GERA UMA RESPOSTA COM OS PRECOS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function products(account, message) {
	try {
		const spreadsheets = (account.googleSheets) ? await googleSheets.getPageJsonText(account) : undefined;
		const res = await groq.groq.chat.completions.create({
			model: account.bot.model,
			messages: [
				{
					role: "system",
					content: `O usuário fez uma pergunta sobre o meu produto e gostaria que você gerasse uma resposta baseado com os dados a seguir:\n${spreadsheets}`
				},
				{
					role: "user",
					content: message.text.body
				}
			],
			max_tokens: account.bot.maxTokens,
			response_format: { type: "text" },
			temperature: 0,
			top_p: 0.9
		});

console.log(res)
		await send.text(account, message.from, { text: { body: res.choices[0].message.content } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "products": ${error}`);
	}
}