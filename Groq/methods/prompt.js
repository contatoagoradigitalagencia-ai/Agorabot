import mongodb from "../../MongoDB/Mongodb.js";
import googleSheets from "../../Google Sheets/GoogleSheets.js";

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
export default async function prompt(account) {
	try {
		const spreadsheets = await textSpreadsheets(account);

		return ({ role: "system", content: (spreadsheets) ? `${account.bot.prompt}\nAbaixo segue dados para consulta:${spreadsheets}` : account.bot.prompt });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "prompt": ${error}`);
		return ({ role: "system", content: "" });
	}
}