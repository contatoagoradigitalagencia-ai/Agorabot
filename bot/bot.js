import send from "../Send/Send.js";
import mongodb from "../MongoDB/Mongodb.js";
import googleSheets from "../Google Sheets/GoogleSheets.js";
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
		let table = await googleSheets.getPage(account, account.bot.page);
		table = (table.length) ? JSON.stringify(table) : null;
		const messages = [{ role: "system", content: account.bot.prompt + ((table) ? `\nSegue uma tabela para consulta de dados:\n${table}` : "") }];
		history.forEach((document) => messages.unshift({ role: (document.direction === "inbound") ? "user" : "assistant", content: document.data.text.body }));
		const res = await groq.groq.chat.completions.create({
			model: account.bot.model,
			messages: messages,
			temperature: 0.7,
			max_tokens: 15,
			top_p: 1
		});
		await send.text(account, message.from, { text: { body: res.choices[0].message.content } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "bot": ${error}`);
	}
}