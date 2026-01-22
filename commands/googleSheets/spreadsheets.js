import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";
import googleSheets from "../../Google Sheets/GoogleSheets.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/planilha"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function spreadsheets(account, message) {
	try {
		if (account.googleSheets.pages.length) {
			await send.text(account, message.from, { text: { body: `Nomes das planilhas que alimentam o bot:${account.googleSheets.pages.map((page) => (`\n\`${page}\``)).join("")}` } });
		} else {
			await send.text(account, message.from, { text: { body: "Nenhuma planilha configurada para alimentar o bot" } });
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "spreadsheets": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/planilhas_disponíveis"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function available_spreadsheets(account, message) {
	try {
		const pages = await googleSheets.getPages(account);

		if (pages.length) {
			await send.text(account, message.from, { text: { body: `Nomes das planilhas disponíveis para alimentar o bot:${pages.map((page) => (`\n\`${page}\``)).join("")}` } });
		} else {
			await send.text(account, message.from, { text: { body: "Nenhuma planilha disponível para ser consultada pela IA do bot" } });
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "available_spreadsheets": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/ver_planilha"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function view_spreadsheet(account, message) {
	try {
		const page = message.text.body.split(" ").slice(1).join(" ");

		if (!page) {
			await send.text(account, message.from, { text: { body: "Adicione o nome de uma planilha após o comando `/ver_planilha`" } });
			return ;
		}
		if (!(await googleSheets.getPages(account)).includes(page)) {
			await send.text(account, message.from, { text: { body: `Planilha *${page}* não existe` } });
			return ;
		}
		await send.text(account, message.from, { text: { body: await googleSheets.getPageTable(account, page) } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "view_spreadsheet": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/adicionar_planilha"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function add_spreadsheets(account, message) {
	try {
		const page = message.text.body.split(" ").slice(1).join(" ");

		if (!page) {
			await send.text(account, message.from, { text: { body: "Adicione o nome de uma planilha após o comando `/nova_planilha`" } });
			return ;
		}
		if (!(await googleSheets.getPages(account)).includes(page)) {
			await send.text(account, message.from, { text: { body: `Planilha *${page}* não existe` } });
			return ;
		}
		await mongodb.saveSpreadsheets(account.idPhone, page);
		await send.text(account, message.from, { text: { body: "Planilha adicionada com sucesso" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "add_spreadsheets": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/remover_planilha"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function remove_spreadsheets(account, message) {
	try {
		const page = message.text.body.split(" ").slice(1).join(" ");

		if (!page) {
			await send.text(account, message.from, { text: { body: "Informe o nome da planilha que deseja remover após o comando `/remover_planilha`" } });
			return ;
		}
		await mongodb.removeSpreadsheets(account.idPhone, page);
		await send.text(account, message.from, { text: { body: "Planilha removida com sucesso" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "remove_spreadsheets": ${error}`);
	}
}