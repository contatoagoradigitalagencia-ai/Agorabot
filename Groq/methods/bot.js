// import send from "../Send/Send.js";
// import mongodb from "../MongoDB/Mongodb.js";
// import groq from "../Groq/Groq.js";

import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

import commandsIA from "../../commands/IA/commands.js";

// const response_format = {
// 	type: "json_object",
// 	schema: {
// 		type: "command | text",
// 		command: "/teste | /location",
// 		text: "string | null",
// 	}
// };

// const response_format = {
// 	type: "json_object",
// 	schema: {
// 		type: "object",
// 		properties: {
// 			type: {
// 				type: "string"
// 			},
// 			command: {
// 				type: "string"
// 			},
// 			text: {
// 				type: "string"
// 			}
// 		},
// 		required: ["type"]
// 	}
// };

/**
 * @author VAMPETA
 * @brief GERENCIA O COMPORTAMENTO DO BOT
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function bot(account, message) {
	try {
		const res = await this.groq.chat.completions.create({
			model: account.bot.model,
			messages: [ await this.prompt(account), ...(await this.chatHistory(account, message)) ],
			max_tokens: account.bot.maxTokens,
// response_format: {
// 	type: "json_object",
// 	schema: {
// 		type: "object",
// 		properties: {
// 			produto: {
// 				type: "string"
// 			},
// 			preco: {
// 				type: "string"
// 			}
// 		},
// 		required: ["produto", "preco"]
// 	}
// },
			// response_format: response_format,
			temperature: 0.2,
			top_p: 0.9
		});

// console.log(JSON.stringify(res, null, 2))
// console.log(JSON.stringify([ await groq.prompt(account), ...(await groq.chatHistory(account, message)) ], null, 2))
// console.log(res.choices[0].message)
// console.log((await this.prompt(account)).content)

		if (res.choices[0].message.content[0] === "/" && !res.choices[0].message.content.includes(" ")) {
			await commandsIA(account, message, res.choices[0].message.content);
		} else {
			await send.text(account, message.from, { text: { body: res.choices[0].message.content } });
		}

// CRIAR COMANDOS PARA O BOT PODER USAR
// DEVO PASSAR ESSA LOGICA PARA DENTRO DA CLASSE DA Groq? ASSIM EU VOU PODER CRIAR CLASSES DE OUTRAS IAS E ALTERNAR FACILMENTE
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "bot": ${error}`);
	}
}