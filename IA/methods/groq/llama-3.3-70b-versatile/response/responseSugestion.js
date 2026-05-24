import mongodb from "../../../../../MongoDB/Mongodb.js";
import IA from "../../../../IA.js";

import { rules, currentPrompt, chatHistory } from "../prompt/responseSuggestion.js";

/**
 * @author VAMPETA
 * @brief MONTA O TEXTO DO PROMPT USADO PARA INSTRUIR A IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIOU MENSAGEM
*/
async function prompt(account, phone) {
	try {
		let textPrompt = "";
		const chat = await IA.groq.chatHistory(account, phone, 3);

		textPrompt += rules;
		textPrompt += `${currentPrompt}${account.bot.prompt}\n"""`;
		if (chat.length > 0) {
			textPrompt += `${chatHistory}${chat.map((message) => {
				return (`${(message.role === "user") ? "Cliente" : "Eu"}: ${message.content}\n`);
			}).join("")}"""`;
		}
		return ({
			role: "system",
			content: textPrompt
		});
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "prompt": ${error}`);
		return ({ role: "system", content: "" });
	}
}

/**
 * @author VAMPETA
 * @brief INTERPRETA O CHAT E SUGERE UMA RESPOSTA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIOU MENSAGEM
 * @param {String} input INPUT DO USUARIO MENSIONANDO AS MELHORIAS DESEJADAS
*/
export async function responseSuggestion(account, phone, input) {
	try {
		const messages = [
			await prompt(account, phone),
			{
				role: "user",
				content: input
			}
		];
		const res = await this.groq.groq.chat.completions.create({
			model: "llama-3.3-70b-versatile",
			messages: messages,
			max_tokens: 300,
			response_format: { type: "text" },
			temperature: 0.3,
			top_p: 0.9
		});

		return (res.choices[0].message.content);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error no metodo "responseSuggestion": ${error}`);
		return (null);
	}
}