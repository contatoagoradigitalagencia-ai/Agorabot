import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

import commandsIA from "../../commands/IA/commands.js";

const response_format = {
	type: "json_schema",
	json_schema: {
		name: "bot_response",
		schema: {
			type: "object",
			properties: {
				command: {
					type: "array",
					items: {
						type: "string"
					}
				},
				text: {
					type: "array",
					items: {
						type: "string"
					}
				}
			},
			required: ["command", "text"],
			additionalProperties: false
		}
	}
};

/**
 * @author VAMPETA
 * @brief GERENCIA O COMPORTAMENTO DO BOT
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function bot(account, message) {
	try {
		let json = null;
		const messages = [await this.prompt(account), ...(await this.chatHistory(account, message))];

		for (let retry = 0; retry < 2; retry++) {
			try {
				const res = await this.groq.chat.completions.create({
					model: account.bot.model,
					messages: messages,
					max_tokens: account.bot.maxTokens,
					response_format: response_format,
					temperature: 0,
					top_p: 0.9
				});
				json = JSON.parse(res.choices[0].message.content);
console.log(json)
				break;
			} catch (error) {
				await mongodb.saveError(account.idPhone, `Falha na resposta da IA: ${error}`);
			}
		}
		if (json === null) {
			await mongodb.saveError(account.idPhone, "Não foi possível gerar uma resposta satisfatória com a IA.");
			await send.text(account, message.from, { text: { body: "Tive um problema ao processar sua mensagem. Pode reescrever sua dúvida?" } });
			return ;
		}
		if (json.command.length) {
			await commandsIA(account, message, json.command);
		}
		if (json.text.length) {
			for (const text of json.text) {
				await send.text(account, message.from, { text: { body: text } });
			}
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "bot": ${error}`);
	}
}