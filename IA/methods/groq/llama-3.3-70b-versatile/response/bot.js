import send from "../../../../../Send/Send.js";
import mongodb from "../../../../../MongoDB/Mongodb.js";

import commandsIA from "../../../../../commands/IA/commands.js";

import { promptSchema, promptRules, promptCommands, promptLocation, promptRedirect, promptProducts, promptAmbiguityAndSecurity, promptFallback, promptIdentity } from "../prompt/bot.js";

// 				// GAMBIARRA
// const promptGetConstructions = `
// - /getConstructions → Regras de uso:
//   • usar quando o cliente pedir informações sobre obras, construções, empreendimentos ou serviços em andamento.
// `;

// 				// GAMBIARRA
// const promptSaveConstructions = `
// - /saveConstructions → Regras de uso:
//   • usar somente quando o cliente solicitar cadastrar, registrar ou informar uma nova obra.
//   • nunca executar o comando com informações incompletas.
//   • dados mínimos obrigatórios:
// 	• nome da obra
// 	• endereço ou localização
// 	• número de contato
//   • informar claramente caso não tenha sido possível concluir.

//   • este comando deve ser respondido com o seguinte modelo:
//   {
//     "command": ["/saveConstructions"],
// 	"payload": {
// 	  "name": String,
// 	  "address": String,
// 	  "contact": String
// 	},
// 	"text": [String]
//   }
// `;

/**
 * @author VAMPETA
 * @brief MONTA O TEXTO DO PROMPT USADO PARA INSTRUIR A IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {Object} RETORNA UM OBJETO COM O PROMPT COMPLETO PARA INSTRUIR A IA
*/
async function prompt(account) {
	try {
		let textPrompt = "";

		textPrompt += promptSchema;
		textPrompt += promptRules;
		textPrompt += promptCommands;
		if (account.bot.location.latitude && account.bot.location.longitude) textPrompt += promptLocation;
		if (account.bot.redirect.activated) textPrompt += promptRedirect;
		if (account.googleSheets) textPrompt += promptProducts;
// textPrompt += promptGetConstructions;				// GAMBIARRA
// textPrompt += promptSaveConstructions;				// GAMBIARRA
		if (!account.bot.location && !account.bot.redirect && !account.googleSheets) textPrompt += "Nenhum comando está disponível no momento."
		textPrompt += promptAmbiguityAndSecurity;
		textPrompt += promptFallback;
		textPrompt += `${promptIdentity}${account.bot.prompt}\n`;
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
 * @brief GERENCIA O COMPORTAMENTO DO BOT
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIO A MENSAGEM
*/
export async function bot(account, phone) {
	try {
		let json = null;
		const messages = [await prompt(account), ...(await this.groq.chatHistory(account, phone, 5))];

		for (let retry = 0; retry < 4; retry++) {
			try {
				const res = await this.groq.groq.chat.completions.create({
					model: "llama-3.3-70b-versatile",
					messages: messages,
					max_tokens: 200,
					response_format: { "type": "json_object" },
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
			await send.text(account, phone, { text: { body: "Tive um problema ao processar sua mensagem. Pode reescrever sua dúvida?" } });
			return ;
		}
		if (json.text.length) {
			for (const text of json.text) {
				await send.text(account, phone, { text: { body: text } });
			}
		}
		if (json.command.length) {
			await commandsIA(account, phone, json.command, json);				// ESSE json SO FOI ADICIONADO PARA FAZER A GAMBIARRA
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "bot": ${error}`);
	}
}