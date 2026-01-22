import send from "../Send/Send.js";
import mongodb from "../MongoDB/Mongodb.js";
import googleSheets from "../Google Sheets/GoogleSheets.js";
import groq from "../Groq/Groq.js";

/**
 * @author VAMPETA
 * @brief MONTA O TEXTO COM AS INFORMACOES DAS PAGINAS DAS PLANILHAS ESCOLHIDAS PARA ALIMENTAR O BOT
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {String} RETORNA UMA STRING COM AS INFORMACOES DAS PAGINAS
*/
async function textSpreadsheets(account) {
	try {
		let text = "";
		const availablePages = await googleSheets.getPages(account);

		for (const page of account.googleSheets.pages) {
			if (!availablePages.includes(page)) continue;
			const table = await googleSheets.getPageJson(account, page);
			text += (table.length) ? `\n${JSON.stringify(table)}` : "";
		}
		return (text);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "textSpreadsheets": ${error}`);
		return ("");
	}
}

/**
 * @author VAMPETA
 * @brief MONTA O TEXTO DO PROMPT USADO PARA INSTRUIR A IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {Object} RETORNA UM OBJETO COM O PROMPT COMPLETO PARA INSTRUIR A IA
*/
async function prompt(account) {
	try {
		const spreadsheets = await textSpreadsheets(account);

		return ({ role: "system", content: (spreadsheets) ? `${account.bot.prompt}\nAbaixo segue dados para consulta:${spreadsheets}` : account.bot.prompt });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "prompt": ${error}`);
		return ({ role: "system", content: "" });
	}
}

/**
 * @author VAMPETA
 * @brief MONTA UM ARRAY DE OBJETOS COM O HISTORICO DE MENSAGENS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @return {Array<Object>} RETORNA UMA STRING COM AS INFORMACOES DAS PAGINAS
*/
async function chatHistory(account, message) {
	try {
		const history = await mongodb.Message.find({ idPhone: account.idPhone, phone: message.from }).sort({ _id: -1 }).limit(5);

		return (history.map((message) => ({ role: (message.direction === "inbound") ? "user" : "assistant", content: message.data.text.body })).reverse());
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "chatHistory": ${error}`);
		return ([]);
	}
}

/**
 * @author VAMPETA
 * @brief GERENCIA O COMPORTAMENTO DO BOT
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function bot(account, message) {
	try {
		const res = await groq.groq.chat.completions.create({
			model: account.bot.model,
			messages: [ await prompt(account), ...(await chatHistory(account, message)) ],
			temperature: 0.7,
			max_tokens: 30,
			top_p: 1
		});

		await send.text(account, message.from, { text: { body: res.choices[0].message.content } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "bot": ${error}`);
	}
}