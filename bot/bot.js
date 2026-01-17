import send from "../Send/Send.js";
import mongodb from "../MongoDB/Mongodb.js";

// import Groq from "groq-sdk";

// const groq = new Groq({
// 	apiKey: ""
// });

import groq from "../Groq/Groq.js";

/**
 * @author VAMPETA
 * @brief GERENCIA O COMPORTAMENTO DO BOT
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function bot(account, message) {
	try {
		const history = await mongodb.Message.find({ idPhone: account.idPhone, phone: message.from }).sort({ _id: -1 }).limit(5);
// console.log(JSON.stringify(history, null, 2))
		const messages = history.map((document) => ({ role: (document.direction === "inbound") ? "user" : "system", content: document.data.text.body }));
		messages.unshift({ role: "user", content: message.text.body });
		messages.reverse();
// console.log(messages);
		const res = await groq.chat.completions.create({
			model: "llama-3.1-8b-instant",
			// messages: [
			// 	{
			// 		role: "system",
			// 		content: "Você é um assistente técnico especializado em Node.js."
			// 	},
			// 	{
			// 		role: "user",
			// 		content: "oi"
			// 	}
			// ],
			messages: messages,
			temperature: 0.7,
			max_tokens: 512,
			top_p: 1
		});
// console.log(JSON.stringify(res, null, 2))
		// await send.text(account, message.from, { text: { body: "Oi, eu sou um bot!" } });
		await send.text(account, message.from, { text: { body: res.choices[0].message.content } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "bot": ${error}`);
	}
}