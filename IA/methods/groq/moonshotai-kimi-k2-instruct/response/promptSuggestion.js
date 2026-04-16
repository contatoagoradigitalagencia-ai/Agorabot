import mongodb from "../../../../../MongoDB/Mongodb.js";

import { promptSuggestionSystem } from "../prompt/promptSuggestion.js";

/**
 * @author VAMPETA
 * @brief INTERPRETA A O PROMPT E SUGERE MELHORIAS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} prompt ATUAL PROMPT QUE SERA PEDIDO SUGESTAO DE MELHORIAS
 * @param {String} input INPUT DO USUARIO MENSIONANDO AS MELHORIAS DESEJADAS
*/
export async function promptSuggestion(account, prompt, input) {
	try {
		const messages = [
			{
				role: "system",
				content: `${promptSuggestionSystem}${prompt}\n"""`
			},
			{
				role: "user",
				content: input
			}
		];
		const res = await this.groq.groq.chat.completions.create({
			model: "moonshotai/kimi-k2-instruct",
			messages: messages,
			max_tokens: 500,
			response_format: { type: "text" },
			temperature: 0.3,
			top_p: 0.9
		});

		return (res.choices[0].message.content);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "promptSuggestion": ${error}`);
		return (null);
	}
}